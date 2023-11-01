import { InMemoryOrganizationRepository } from 'src/test/repositories/in-memory-organization-repository';
import { InMemoryPetRepository } from 'src/test/repositories/in-memory-pet-repository';
import { SearchPetsByCityUseCase } from './search-pets-by-city';
import { makePet } from 'src/test/factories/make-pet';
import { makeOrganization } from 'src/test/factories/make-organization';

let organizationRepository: InMemoryOrganizationRepository;
let petsRepository: InMemoryPetRepository;
let sut: SearchPetsByCityUseCase;

describe('authenticate organization tests', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new SearchPetsByCityUseCase(petsRepository, organizationRepository);
  });
  
  it('should be able to fetch pets located in given city', async () => {
    const createdOrg = makeOrganization({
      address: 'Fake Street, 0. City ABC - SP. Brasil',
    });
    organizationRepository.create(createdOrg);

    petsRepository.create(makePet({ orgId: createdOrg.id }));
    petsRepository.create(makePet());
    
    const { pets } = await sut.execute({ city: 'City ABC' });

    expect(pets).toHaveLength(1);
  });
});