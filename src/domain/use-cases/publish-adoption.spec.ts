import { InMemoryAdoptionRepository } from 'src/test/repositories/in-memory-adoption-repository';
import { PublishAdoptionUseCase } from './publish-adoption';

let repository: InMemoryAdoptionRepository;
let sut: PublishAdoptionUseCase;

describe('publish adoption tests', () => {
  beforeEach(() => {
    repository = new InMemoryAdoptionRepository();
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