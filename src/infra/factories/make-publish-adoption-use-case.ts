import { PublishAdoptionUseCase } from 'src/domain/use-cases/publish-adoption';
import { PrismaAdoptionRepository } from '../database/prisma/repositories/prisma-adoption-repository';

export function makePublishAdoptionUseCase(): PublishAdoptionUseCase {
  const adoptionRepository = new PrismaAdoptionRepository();
  const useCase = new PublishAdoptionUseCase(adoptionRepository);

  return useCase;
}