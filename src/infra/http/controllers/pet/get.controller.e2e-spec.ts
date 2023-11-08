import request from 'supertest';
import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';
import { makePrismaPet } from 'src/test/factories/make-pet';

let prismaService: PrismaAdapter;

describe('[e2e] Get Pet', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    prismaService = new PrismaAdapter();
  });

  it('should be able to get a pet', async () => {
    const org = await makePrismaOrganization(prismaService);
    const pet = await makePrismaPet(prismaService, { orgId: org.id, name: 'afonso' });

    const response = await request(app.server)
      .get(`/pets/${pet.id.toString()}`)
      .send();

    console.log(JSON.stringify(response.body.pet));
    expect(response.statusCode).toEqual(200);
    expect(response.body.pet).toEqual(expect.objectContaining({ name: 'afonso' }));
  });
});