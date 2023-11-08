import { fakerPT_BR as faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { Adoption, AdoptionProps } from 'src/domain/entities/adoption';
import { PrismaAdoptionMapper } from 'src/infra/database/prisma/mappers/adoption-mapper';

export function makeAdoption(
  override: Partial<AdoptionProps> = {},
  id?: UniqueEntityID,
) {
  const fakeAdoption = Adoption.create({
    orgId: new UniqueEntityID(),
    petId: new UniqueEntityID(),
    requirements: [
      faker.lorem.words(5)
    ],
    ...override,
  },
  id,
  );

  return fakeAdoption;
}

export async function makePrismaAdoption(
  prisma: PrismaClient, data: Partial<AdoptionProps> = {}
): Promise<Adoption> {
  const fakeAdoption = makeAdoption(data);

  await prisma.adoption.create({
    data: PrismaAdoptionMapper.toPrisma(fakeAdoption)
  });

  return fakeAdoption;
}