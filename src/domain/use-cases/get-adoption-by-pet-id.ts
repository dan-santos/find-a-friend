import { IAdoptionRepository } from '../repositories/adoption.repository';
import { Adoption } from '../entities/adoption';
import { ResourceNotFoundError } from 'src/core/errors/custom-errors';

interface GetAdoptionByPetIdUseCaseRequest {
  petId: string,
}

interface GetAdoptionByPetIdUseCaseResponse {
  adoption: Adoption,
}

export class GetAdoptionByPetIdUseCase {
  constructor(
    private adoptionsRepository: IAdoptionRepository,
  ) { }

  async execute({ petId }: GetAdoptionByPetIdUseCaseRequest): Promise<GetAdoptionByPetIdUseCaseResponse> {
    const adoption = await this.adoptionsRepository.findByPetId(petId);

    if (!adoption) throw new ResourceNotFoundError();
    return { 
      adoption,
    };
  }
}