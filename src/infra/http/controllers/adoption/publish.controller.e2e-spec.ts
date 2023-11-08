import request from 'supertest';
import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';
import { makePrismaPet } from 'src/test/factories/make-pet';

let prismaService: PrismaAdapter;

describe('[e2e] Publish adoption', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    prismaService = new PrismaAdapter();
  });

  it('should be able to publish a pet available to adoption', async () => {
    const org = await makePrismaOrganization(prismaService);
    const pet = await makePrismaPet(prismaService, { orgId: org.id });

    const response = await request(app.server)
      .post('/adoptions')
      .send({
        orgId: org.id.toString(),
        petId: pet.id.toString(),
        requirements: [
          'must have spacious yard',
          'must like dogs'
        ]
      });

    expect(response.statusCode).toEqual(201);
  });
});