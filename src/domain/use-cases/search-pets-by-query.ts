import { Pet, PetProps } from '../entities/pet';
import { IPetRepository } from '../repositories/pet.repository';
import { IOrganizationRepository } from '../repositories/organization.repository';

interface SearchPetsByQueryUseCaseRequest {
  city: string,
  query?: Partial<PetProps>
}

interface SearchPetsByQueryUseCaseResponse {
  pets: Pet[];
}

export class SearchPetsByQueryUseCase {
  constructor(
    private petsRepository: IPetRepository,
    private organizationsRepository: IOrganizationRepository
  ) { }

  async execute({ city, query }: SearchPetsByQueryUseCaseRequest): Promise<SearchPetsByQueryUseCaseResponse> {

    const organizationsInCity = await this.organizationsRepository.findManyByCity(city);

    if (!organizationsInCity || organizationsInCity.length === 0) return {pets: []};

    const organizationsIds = organizationsInCity.map(org => org.id.toString());

    if (!organizationsIds || organizationsIds.length === 0) return {pets: []};

    const pets = await this.petsRepository.findManyByQuery(organizationsIds, query);

    return {
      pets,
    };
  }
}