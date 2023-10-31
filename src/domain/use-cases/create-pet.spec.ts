import { InMemoryPetRepository } from 'src/test/repositories/in-memory-pet-repository';
import { CreatePetUseCase } from './create-pet';
import { WrongTypeError } from 'src/core/errors/custom-errors';

let repository: InMemoryPetRepository;
let sut: CreatePetUseCase;

describe('create pet tests', () => {
  beforeEach(() => {
    repository = new InMemoryPetRepository();
    sut = new CreatePetUseCase(repository);
  });
  
  it('should be able to create a pet', async () => {
    await sut.execute({
      orgId: 'fake org',
      name: 'pet',
      age: 1,
      description: 'some description',
      energy: 'Mediana',
      environment: 'Mediano',
      independency: 'Moderado',
      size: 'Pequeno',
      photosIds: []
    });

    expect(repository.items).toHaveLength(1);
  });

  it('should NOT be able to create a pet when age is not an Integer', async () => {
    await expect(() => sut.execute({
      orgId: 'fake org',
      name: 'pet',
      age: 1.5,
      description: 'some description',
      energy: 'Mediana',
      environment: 'Mediano',
      independency: 'Moderado',
      size: 'Pequeno',
      photosIds: []
    })).rejects.toBeInstanceOf(WrongTypeError);
  });
});