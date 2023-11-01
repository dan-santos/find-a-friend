import { fakerPT_BR as faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { Pet, PetProps } from 'src/domain/entities/pet';

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