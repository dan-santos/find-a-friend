import request from 'supertest';
import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { makePrismaPet } from 'src/test/factories/make-pet';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';

let prismaService: PrismaAdapter;

describe('[e2e] Search Pets by city', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    prismaService = new PrismaAdapter();
  });

  it('should be able to search a pet in specific city', async () => {
    const org1 = await makePrismaOrganization(prismaService, { address: 'Rua 1, São Paulo - SP' });
    const org2 = await makePrismaOrganization(prismaService);

    await makePrismaPet(prismaService, { orgId: org1.id });
    await makePrismaPet(prismaService, { orgId: org1.id });
    await makePrismaPet(prismaService, { orgId: org2.id });

    const response = await request(app.server)
      .get('/pets?city=São Paulo')
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.pets).toHaveLength(2);
  });
});