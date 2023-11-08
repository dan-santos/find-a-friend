import request from 'supertest';
import { app } from 'src/app';
import { makeAuthenticatedPrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';
import { makePrismaPet } from 'src/test/factories/make-pet';
import { BcryptHasher } from 'src/infra/auth/bcrypt-hasher';

let prismaService: PrismaAdapter;
let crypto: BcryptHasher;

describe('[e2e] Publish adoption', () => {
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

  it('should be able to publish a pet available to adoption', async () => {
    const { organization, accessToken } = await makeAuthenticatedPrismaOrganization(
      prismaService, 
      app, 
      crypto, 
      {
        email: 'org@mail.com',
        plainPassword: '123456'
      }
    );
    const pet = await makePrismaPet(prismaService, { orgId: organization.id });

    const response = await request(app.server)
      .post('/adoptions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        orgId: organization.id.toString(),
        petId: pet.id.toString(),
        requirements: [
          'must have spacious yard',
          'must like dogs'
        ]
      });

    expect(response.statusCode).toEqual(201);
  });
});