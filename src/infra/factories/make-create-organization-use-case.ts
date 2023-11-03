import { CreateOrganizationUseCase } from 'src/domain/use-cases/create-organization';
import { PrismaOrganizationRepository } from '../database/prisma/repositories/prisma-organization-repository';
import { BcryptHasher } from '../auth/bcrypt-hasher';

export function makeCreateOrganizationUseCase(): CreateOrganizationUseCase {
  const organizationsRepository = new PrismaOrganizationRepository();
  const crypto = new BcryptHasher();
  const useCase = new CreateOrganizationUseCase(organizationsRepository, crypto);

  return useCase;
}