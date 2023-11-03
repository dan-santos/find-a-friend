import { IAdoptionRepository } from '../repositories/adoption.repository';
import { Adoption } from '../entities/adoption';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';

interface PublishAdoptionUseCaseRequest {
  petId: string,
  orgId: string,
  adoptionRequirements: string[]
}

export class PublishAdoptionUseCase {
  constructor(
    private adoptionsRepository: IAdoptionRepository,
  ) { }

  async execute({ petId, orgId, adoptionRequirements }: PublishAdoptionUseCaseRequest): Promise<Adoption> {
    const adoption = Adoption.create({
      petId: new UniqueEntityID(petId),
      orgId: new UniqueEntityID(orgId),
      requirements: adoptionRequirements
    });
    await this.adoptionsRepository.create(adoption);

    return adoption;
  }
}