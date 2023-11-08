import request from 'supertest';
import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';
import { BcryptHasher } from 'src/infra/auth/bcrypt-hasher';

let prismaService: PrismaAdapter;
let crypto: BcryptHasher;

describe('[e2e] Authenticate Organization', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    prismaService = new PrismaAdapter();
    crypto = new BcryptHasher();
  });

  it('should be get access_token of an existent organization', async () => {
    await makePrismaOrganization(prismaService, { email: 'fake@mail.com', password: await crypto.hash('123456') });
    const response = await request(app.server)
      .post('/sessions')
      .send({
        email: 'fake@mail.com',
        password: '123456'
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining({ access_token: expect.any(String) }));
  });
});