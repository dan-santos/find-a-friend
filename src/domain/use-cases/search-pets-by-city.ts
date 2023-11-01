import { Pet } from '../entities/pet';
import { IPetRepository } from '../repositories/pet.repository';
import { IOrganizationRepository } from '../repositories/organization.repository';

interface SearchPetsByCityUseCaseRequest {
  city: string
}

interface SearchPetsByCityUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsByCityUseCase {
  constructor(
    private petsRepository: IPetRepository,
    private organizationsRepository: IOrganizationRepository
  ) { }

  async execute({ city }: SearchPetsByCityUseCaseRequest): Promise<SearchPetsByCityUseCaseResponse> {

    const organizationsInCity = await this.organizationsRepository.findManyByCity(city);

    if (!organizationsInCity || organizationsInCity.length === 0) return {pets: []};

    const organizationsIds = organizationsInCity.map(org => org.id.toString());

    if (!organizationsIds || organizationsIds.length === 0) return {pets: []};

    const pets = await this.petsRepository.findManyByOrgIds(organizationsIds);

    return {
      pets,
    };
  }
}