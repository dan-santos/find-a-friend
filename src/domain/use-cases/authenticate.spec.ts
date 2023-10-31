import { InMemoryOrganizationRepository } from 'src/test/repositories/in-memory-organization-repository';
import { BcryptHasher } from 'src/infra/auth/bcrypt-hasher';
import { Organization } from '../entities/organization';
import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from 'src/core/errors/custom-errors';

let crypto: BcryptHasher;
let repository: InMemoryOrganizationRepository;
let sut: AuthenticateUseCase;

describe('authenticate organization tests', () => {
  beforeEach(() => {
    crypto = new BcryptHasher();
    repository = new InMemoryOrganizationRepository();
    sut = new AuthenticateUseCase(repository, crypto);
  });
  
  it('should be able to authenticate a existing organization', async () => {
    const createdOrg = Organization.create({
      responsableName: 'Org Owner',
      address: 'fake address',
      cep: '00000-000',
      phone: '123-145',
      email: 'fake@mail.com',
      password: await crypto.hash('123456')
    });
    repository.create(createdOrg);

    const { organization } = await sut.execute({ email: createdOrg.email, password: '123456' });

    expect(organization.id.toString()).toEqual(expect.any(String));
  });

  it('should NOT be able to authenticate a unexisting organization', async () => {
    await expect(() => 
      sut.execute({ email: 'unexistent-email', password: '123456' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it('should NOT be able to authenticate a organization with wrong password', async () => {
    const createdOrg = Organization.create({
      responsableName: 'Org Owner',
      address: 'fake address',
      cep: '00000-000',
      phone: '123-145',
      email: 'fake@mail.com',
      password: await crypto.hash('123456')
    });
    repository.create(createdOrg);

    await expect(() => 
      sut.execute({ email: createdOrg.email, password: '1234567' })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});