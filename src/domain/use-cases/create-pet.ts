import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { Pet } from '../entities/pet';
import { IPetRepository } from '../repositories/pet.repository';
import { WrongTypeError } from 'src/core/errors/custom-errors';

interface CreatePetUseCaseRequest {
  orgId: string;
  name: string;
  description: string;
  age: number;
  size: 'Pequeno' | 'Mediano' | 'Grande';
  energy: 'Baixissima' | 'Baixa' | 'Mediana' | 'Alta' | 'Altissima';
  independency: 'Baixo' | 'Moderado' | 'Alto';
  environment: 'Pequeno' | 'Mediano' | 'Grande';
  photosIds: string[];
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: IPetRepository
  ) { }

  async execute({
    name, orgId, description, age, size, energy, independency, environment, photosIds
  }: CreatePetUseCaseRequest): Promise<Pet> {

    if (!Number.isInteger(age)) throw new WrongTypeError('age', 'integer');

    const pet = Pet.create({
      orgId: new UniqueEntityID(orgId),
      name,
      description,
      age,
      size,
      energy,
      independency,
      environment,
      photosIds
    });

    await this.petsRepository.create(pet);

    return pet;
  }
}