import { fakerPT_BR as faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { Organization, OrganizationProps } from 'src/domain/entities/organization';
import { PrismaOrganizationMapper } from 'src/infra/database/prisma/mappers/organization-mapper';

export function makeOrganization(
  override: Partial<OrganizationProps> = {},
  id?: UniqueEntityID,
) {
  const fakeOrganization = Organization.create({
    responsableName: faker.person.fullName(),
    address: faker.location.streetAddress(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    cep: faker.location.zipCode(),
    password: faker.lorem.words(6),
    ...override,
  },
  id,
  );

  return fakeOrganization;
}

export async function makePrismaOrganization(
  prisma: PrismaClient, data: Partial<OrganizationProps> = {}
): Promise<Organization> {
  const fakeOrganization = makeOrganization(data);

  await prisma.organization.create({
    data: PrismaOrganizationMapper.toPrisma(fakeOrganization)
  });

  return fakeOrganization;
}