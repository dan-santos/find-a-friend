import { GetAdoptionByPetIdUseCase } from 'src/domain/use-cases/get-adoption-by-pet-id';
import { PrismaAdoptionRepository } from '../database/prisma/repositories/prisma-adoption-repository';
import { RedisCacheRepository } from '../cache/redis/redis-cache-repository';
import { PrismaAdapter } from '../database/prisma/prisma.adapter';

export function makeGetAdoptionByPetIdUseCase(): GetAdoptionByPetIdUseCase {
  const adoptionRepository = new PrismaAdoptionRepository(new RedisCacheRepository(), new PrismaAdapter());
  const useCase = new GetAdoptionByPetIdUseCase(adoptionRepository);

  return useCase;
}