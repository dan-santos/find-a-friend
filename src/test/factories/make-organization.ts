import request from 'supertest';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { Organization, OrganizationProps } from 'src/domain/entities/organization';
import { PrismaOrganizationMapper } from 'src/infra/database/prisma/mappers/organization-mapper';
import { ICrypto } from 'src/domain/auth/crypto.interface';

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

export async function makeAuthenticatedPrismaOrganization(
  prisma: PrismaClient, app: FastifyInstance, crypto: ICrypto, data: { email: string, plainPassword: string }
): Promise<{ organization: Organization, accessToken: string }> {
  const hashedPassword = await crypto.hash(data.plainPassword);

  const fakeOrganization = makeOrganization({ email: data.email, password: hashedPassword });

  await prisma.organization.create({
    data: PrismaOrganizationMapper.toPrisma(fakeOrganization)
  });

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({
      email: fakeOrganization.email,
      password: data.plainPassword
    });

  const token = authResponse.body.access_token;

  return {
    organization: fakeOrganization,
    accessToken: token,
  };
}