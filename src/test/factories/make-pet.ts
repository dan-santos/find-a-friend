import { fakerPT_BR as faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { Pet, PetProps } from 'src/domain/entities/pet';
import { PrismaPetMapper } from 'src/infra/database/prisma/mappers/pet-mapper';
import { prisma } from 'src/infra/database/prisma/prisma.service';

export function makePet(
  override: Partial<PetProps> = {},
  id?: UniqueEntityID,
) {
  const fakePet = Pet.create({
    orgId: new UniqueEntityID(),
    age: faker.number.int(10),
    description: faker.lorem.words(),
    energy: 'Mediana',
    environment: 'Mediano',
    independency: 'Moderado',
    name: faker.person.firstName(),
    size: 'Mediano',
    ...override,
  },
  id,
  );

  return fakePet;
}

export async function makePrismaPet(data: Partial<PetProps> = {}): Promise<Pet> {
  const fakePet = makePet(data);

  await prisma.pet.create({
    data: PrismaPetMapper.toPrisma(fakePet)
  });

  return fakePet;
}