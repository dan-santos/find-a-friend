import { GetPetUseCase } from 'src/domain/use-cases/get-pet';
import { PrismaPetRepository } from '../database/prisma/repositories/prisma-pet-repository';

export function makeGetPetUseCase(): GetPetUseCase {
  const petsRepository = new PrismaPetRepository();
  const useCase = new GetPetUseCase(petsRepository);

  return useCase;
}