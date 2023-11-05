import { PrismaPetRepository } from '../database/prisma/repositories/prisma-pet-repository';
import { SearchPetsByQueryUseCase } from 'src/domain/use-cases/search-pets-by-query';
import { PrismaOrganizationRepository } from '../database/prisma/repositories/prisma-organization-repository';

export function makeSearchPetsByQueryUseCase(): SearchPetsByQueryUseCase {
  const petsRepository = new PrismaPetRepository();
  const orgsRepository = new PrismaOrganizationRepository();
  const useCase = new SearchPetsByQueryUseCase(petsRepository, orgsRepository);

  return useCase;
}