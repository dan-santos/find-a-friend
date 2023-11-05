import request from 'supertest';
import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { makePrismaPet } from 'src/test/factories/make-pet';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';

describe('[e2e] Search Pets by query', () => {
  let prismaService: PrismaAdapter;

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    prismaService = new PrismaAdapter();
  });

  it('should be able to search a pet in specific city and given query params', async () => {
    const org1 = await makePrismaOrganization(prismaService, { address: 'Rua 1, São Paulo - SP' });

    await makePrismaPet(prismaService, { orgId: org1.id, age: 1, size: 'Mediano' });
    await makePrismaPet(prismaService, { orgId: org1.id, age: 2, size: 'Mediano' });
    await makePrismaPet(prismaService, { orgId: org1.id, age: 2, size: 'Pequeno' });

    expect((await request(app.server).get('/pets?city=São Paulo&size=Mediano').send()).body.pets).toHaveLength(2);
    expect((await request(app.server).get('/pets?city=São Paulo&age=2').send()).body.pets).toHaveLength(2);
    expect((await request(app.server).get('/pets?city=São Paulo&age=1&size=Pequeno').send()).body.pets).toHaveLength(0);
  });
});