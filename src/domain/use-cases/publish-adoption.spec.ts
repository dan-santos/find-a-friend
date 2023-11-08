import { InMemoryAdoptionRepository } from 'src/test/repositories/in-memory-adoption-repository';
import { PublishAdoptionUseCase } from './publish-adoption';
import { InMemoryPetRepository } from 'src/test/repositories/in-memory-pet-repository';
import { InMemoryOrganizationRepository } from 'src/test/repositories/in-memory-organization-repository';

let petsRepository: InMemoryPetRepository;
let orgsRepository: InMemoryOrganizationRepository;
let repository: InMemoryAdoptionRepository;
let sut: PublishAdoptionUseCase;

describe('publish adoption tests', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    orgsRepository = new InMemoryOrganizationRepository();
    repository = new InMemoryAdoptionRepository(petsRepository, orgsRepository);
    sut = new PublishAdoptionUseCase(repository);
  });
  
  it('should be able to create a adoption', async () => {
    await sut.execute({
      orgId: 'fake org id',
      petId: 'fake pet id',
      adoptionRequirements: [
        'must live in a house with a large yard',
        'must like agitated dog'
      ]
    });

    expect(repository.items).toHaveLength(1);
  });
});