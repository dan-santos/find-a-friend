import { IAdoptionRepository } from '../repositories/adoption.repository';
import { ResourceNotFoundError } from 'src/core/errors/custom-errors';
import { AdoptionDetails } from 'src/infra/database/prisma/mappers/adoption-mapper';

interface GetAdoptionByPetIdUseCaseRequest {
  petId: string,
}

interface GetAdoptionByPetIdUseCaseResponse {
  adoption: AdoptionDetails,
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