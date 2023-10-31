import { InMemoryOrganizationRepository } from 'src/test/repositories/in-memory-organization-repository';
import { CreateOrganizationUseCase } from './create-organization';
import { WrongTypeError } from 'src/core/errors/custom-errors';
import { BcryptHasher } from 'src/infra/auth/bcrypt-hasher';

let crypto: BcryptHasher;
let repository: InMemoryOrganizationRepository;
let sut: CreateOrganizationUseCase;

describe('create organization tests', () => {
  beforeEach(() => {
    crypto = new BcryptHasher();
    repository = new InMemoryOrganizationRepository();
    sut = new CreateOrganizationUseCase(repository, crypto);
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

  it('should hashes given password before persist', async () => {
    const organization = await sut.execute({
      responsableName: 'Org Owner',
      address: 'fake address',
      cep: '00000-000',
      phone: '123-145',
      email: 'fake@mail.com',
      password: '123456'
    });

    const hashedPassword = organization.password;
    const doesPasswordMatches = await crypto.compare('123456', hashedPassword);

    expect(hashedPassword).not.toEqual('123456');
    expect(doesPasswordMatches).toBe(true);
  });
});