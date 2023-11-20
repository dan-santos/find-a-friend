import { PublishAdoptionUseCase } from 'src/domain/use-cases/publish-adoption';
import { PrismaAdoptionRepository } from '../database/prisma/repositories/prisma-adoption-repository';
import { PrismaAdapter } from '../database/prisma/prisma.adapter';
import { RedisCacheRepository } from '../cache/redis/redis-cache-repository';

export function makePublishAdoptionUseCase(): PublishAdoptionUseCase {
  const adoptionRepository = new PrismaAdoptionRepository(new RedisCacheRepository(), new PrismaAdapter());
  const useCase = new PublishAdoptionUseCase(adoptionRepository);

  return useCase;
}