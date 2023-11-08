import request from 'supertest';
import { app } from 'src/app';
import { makeAuthenticatedPrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';
import { BcryptHasher } from 'src/infra/auth/bcrypt-hasher';

let prismaService: PrismaAdapter;
let crypto: BcryptHasher;

describe('[e2e] Create Pet', () => {
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

  it('should be able to create a pet', async () => {
    const { organization, accessToken } = await makeAuthenticatedPrismaOrganization(
      prismaService, 
      app, 
      crypto, 
      {
        email: 'org@mail.com',
        plainPassword: '123456'
      }
    );

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        orgId: organization.id.toString(),
        name: 'afonso',
        description: 'alguma descricao',
        age: 1,
        size: 'Grande',
        energy: 'Baixa',
        independency: 'Moderado',
        environment: 'Pequeno',
        photosIds: []
      });

    expect(response.statusCode).toEqual(201);
  });
});