import { ResourceNotFoundError } from 'src/core/errors/custom-errors';
import { Pet } from '../entities/pet';
import { IPetRepository } from '../repositories/pet.repository';

interface GetPetUseCaseRequest {
  petId: string
}

interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  constructor(
    private petsRepository: IPetRepository,
  ) { }

  async execute({ petId }: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new ResourceNotFoundError();

    return {
      pet,
    };
  }
}