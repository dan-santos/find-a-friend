import { PrismaOrganizationRepository } from '../database/prisma/repositories/prisma-organization-repository';
import { BcryptHasher } from '../auth/bcrypt-hasher';
import { AuthenticateUseCase } from 'src/domain/use-cases/authenticate';

export function makeAuthenticateOrganizationUseCase(): AuthenticateUseCase {
  const organizationsRepository = new PrismaOrganizationRepository();
  const crypto = new BcryptHasher();
  const useCase = new AuthenticateUseCase(organizationsRepository, crypto);

  return useCase;
}