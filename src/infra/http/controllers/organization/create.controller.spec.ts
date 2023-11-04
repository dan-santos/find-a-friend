import request from 'supertest';
import { app } from 'src/app';

describe('[e2e] Create Organization', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to create a organization', async () => {
    const response = await request(app.server)
      .post('/organizations')
      .send({
        responsableName: 'afonso',
        email: 'fake@mail.com',
        cep: '12345-678',
        phone: '83921789123',
        address: 'Cidade Baixa, São Paulo - SP',
        password: '123456'
      });

    expect(response.statusCode).toEqual(201);
  });
});