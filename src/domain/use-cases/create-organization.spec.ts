import { InMemoryOrganizationRepository } from 'src/test/repositories/in-memory-organization-repository';
import { CreateOrganizationUseCase } from './create-organization';
import { WrongTypeError } from 'src/core/errors/custom-errors';

let repository: InMemoryOrganizationRepository;
let sut: CreateOrganizationUseCase;

describe('create organization tests', () => {
  beforeEach(() => {
    repository = new InMemoryOrganizationRepository();
    sut = new CreateOrganizationUseCase(repository);
  });
  
  it('should be able to create a organization', async () => {
    await sut.execute({
      responsableName: 'Org Owner',
      address: 'fake address',
      cep: '00000-000',
      phone: '123-145',
      email: 'fake@mail.com',
      password: '123456'
    });

    expect(repository.items).toHaveLength(1);
  });

  it('should NOT be able to create a organization without valid cep', async () => {
    await expect(() => sut.execute({
      responsableName: 'Org Owner',
      address: 'fake address',
      cep: 'abc123',
      phone: '123-145',
      email: 'fake@mail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(WrongTypeError);
  });

  it('should NOT be able to create a organization without valid email', async () => {
    await expect(() => sut.execute({
      responsableName: 'Org Owner',
      address: 'fake address',
      cep: '00000-000',
      phone: '123-145',
      email: 'fakemail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(WrongTypeError);
  });
});