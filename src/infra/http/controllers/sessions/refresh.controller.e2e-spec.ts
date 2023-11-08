import request from 'supertest';
import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';
import { BcryptHasher } from 'src/infra/auth/bcrypt-hasher';

let prismaService: PrismaAdapter;
let crypto: BcryptHasher;

describe('[e2e] Refresh token of a organization', () => {
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

  it('should be refresh access token of an existent organization', async () => {
    await makePrismaOrganization(prismaService, { email: 'fake@mail.com', password: await crypto.hash('123456') });
    const authResponse = await request(app.server)
      .post('/sessions')
      .send({
        email: 'fake@mail.com',
        password: '123456'
      });

    const cookies = authResponse.get('Set-Cookie');

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
      access_token: expect.any(String),
    });
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ]);
  });
});