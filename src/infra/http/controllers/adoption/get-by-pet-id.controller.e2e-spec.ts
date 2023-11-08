import request from 'supertest';
import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';
import { makePrismaPet } from 'src/test/factories/make-pet';
import { makePrismaAdoption } from 'src/test/factories/make-adoption';

let prismaService: PrismaAdapter;

describe('[e2e] Get adoption by pet id', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    prismaService = new PrismaAdapter();
  });

  it('should be able to get an adoption by pet id', async () => {
    const org = await makePrismaOrganization(prismaService);
    const pet = await makePrismaPet(prismaService, { orgId: org.id });
    await makePrismaAdoption(prismaService, { petId: pet.id, orgId: org.id });

    const response = await request(app.server)
      .get(`/adoptions/pets/${pet.id.toString()}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.adoptionDetails).toEqual(expect.objectContaining({ adoption: expect.any(Object) }));
  });
});