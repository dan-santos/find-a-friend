import { InMemoryAdoptionRepository } from 'src/test/repositories/in-memory-adoption-repository';
import { makeAdoption } from 'src/test/factories/make-adoption';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { GetAdoptionByPetIdUseCase } from './get-adoption-by-pet-id';

let repository: InMemoryAdoptionRepository;
let sut: GetAdoptionByPetIdUseCase;

describe('get adoption details by pet id tests', () => {
  beforeEach(() => {
    repository = new InMemoryAdoptionRepository();
    sut = new GetAdoptionByPetIdUseCase(repository);
  });
  
  it('should be able to get a adoption by pet id', async () => {
    repository.create(makeAdoption({ petId: new UniqueEntityID('some-pet-id') }));

    await sut.execute({ petId: 'some-pet-id' });

    expect(repository.items).toHaveLength(1);
  });
});