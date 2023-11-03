import { CreatePetUseCase } from 'src/domain/use-cases/create-pet';
import { PrismaPetRepository } from '../database/prisma/repositories/prisma-pet-repository';

export function makeCreatePetUseCase(): CreatePetUseCase {
  const petsRepository = new PrismaPetRepository();
  const useCase = new CreatePetUseCase(petsRepository);

  return useCase;
}