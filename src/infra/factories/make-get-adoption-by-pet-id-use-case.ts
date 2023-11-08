import { GetAdoptionByPetIdUseCase } from 'src/domain/use-cases/get-adoption-by-pet-id';
import { PrismaAdoptionRepository } from '../database/prisma/repositories/prisma-adoption-repository';

export function makeGetAdoptionByPetIdUseCase(): GetAdoptionByPetIdUseCase {
  const adoptionRepository = new PrismaAdoptionRepository();
  const useCase = new GetAdoptionByPetIdUseCase(adoptionRepository);

  return useCase;
}