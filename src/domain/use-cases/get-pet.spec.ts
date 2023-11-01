import { InMemoryPetRepository } from 'src/test/repositories/in-memory-pet-repository';
import { GetPetUseCase } from './get-pet';
import { makePet } from 'src/test/factories/make-pet';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { ResourceNotFoundError } from 'src/core/errors/custom-errors';

let repository: InMemoryPetRepository;
let sut: GetPetUseCase;

describe('get pet tests', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository();
    sut = new GetPetUseCase(repository);
  });
  
  it('should be able to get a existing pet', async () => {
    repository.create(makePet({ name: 'afonso' }, new UniqueEntityID('pet-id')));
    const { pet } = await sut.execute({ petId: 'pet-id' });

    expect(pet.name).toEqual('afonso');
  });

  it('should NOT be able to get a unexisting pet', async () => {
    await expect(() => 
      sut.execute({ petId: 'pet-id' })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});