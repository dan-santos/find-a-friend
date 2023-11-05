import request from 'supertest';
import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';

let prismaService: PrismaAdapter;

describe('[e2e] Create Pet', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    prismaService = new PrismaAdapter();
  });

  it('should be able to create a pet', async () => {
    const org = await makePrismaOrganization(prismaService);

    const response = await request(app.server)
      .post('/pets')
      .send({
        orgId: org.id.toString(),
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