import { InMemoryOrganizationRepository } from 'src/test/repositories/in-memory-organization-repository';
import { InMemoryPetRepository } from 'src/test/repositories/in-memory-pet-repository';
import { makePet } from 'src/test/factories/make-pet';
import { makeOrganization } from 'src/test/factories/make-organization';
import { SearchPetsByQueryUseCase } from './search-pets-by-query';

let organizationRepository: InMemoryOrganizationRepository;
let petsRepository: InMemoryPetRepository;
let sut: SearchPetsByQueryUseCase;

describe('search pets by city and query tests', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new SearchPetsByQueryUseCase(petsRepository, organizationRepository);
  });
  
  it('should be able to fetch pets located in given city and given query params', async () => {
    // the filters is applied in somatory format (or), and not exclude form (and)
    const org1 = makeOrganization({
      address: 'Fake Street, 0. City ABC - SP. Brasil',
    });
    const org2 = makeOrganization();
    organizationRepository.create(org1);
    organizationRepository.create(org2);

    petsRepository.create(makePet({ orgId: org1.id, age: 1, energy: 'Alta', size: 'Pequeno' }));
    petsRepository.create(makePet({ orgId: org1.id, age: 2, energy: 'Alta', size: 'Mediano' }));
    petsRepository.create(makePet({ orgId: org1.id, name: 'afonso-mock', age: 2, energy: 'Baixa', size: 'Grande' }));
    petsRepository.create(makePet({ orgId: org2.id, age: 3, energy: 'Mediana', size: 'Grande' }));
    
    let result = (await sut.execute({ city: 'City ABC', query: { name: 'afonso-mock' } })).pets;
    expect(result).toHaveLength(1);

    result = (await sut.execute({ city: 'City ABC', query: { age: 2 } })).pets;
    expect(result).toHaveLength(2);

    result = (await sut.execute({ city: 'City ABC', query: { age: 2, energy: 'Alta' } })).pets;
    expect(result).toHaveLength(3);

    result = (await sut.execute({ city: org1.address, query: { energy: 'Alta' } })).pets;
    expect(result).toHaveLength(2);

    result = (await sut.execute({ city: org2.address, query: { size: 'Pequeno' } })).pets;
    expect(result).toHaveLength(0);

    result = (await sut.execute({ city: org2.address, query: { age: 3 } })).pets;
    expect(result).toHaveLength(1);
  });

  it('should be able to fetch pets located in given city and null query params', async () => {
    const org1 = makeOrganization({
      address: 'Fake Street, 0. City ABC - SP. Brasil',
    });
    const org2 = makeOrganization();
    organizationRepository.create(org1);
    organizationRepository.create(org2);

    petsRepository.create(makePet({ orgId: org1.id, age: 1 }));
    petsRepository.create(makePet({ orgId: org1.id, age: 2 }));
    petsRepository.create(makePet({ orgId: org1.id, name: 'afonso-mock', age: 2 }));
    petsRepository.create(makePet({ orgId: org2.id, age: 3 }));
    
    const result = (await sut.execute({ city: 'City ABC' })).pets;
    await expect(result).toHaveLength(3);
  });
});