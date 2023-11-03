import { fakerPT_BR as faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { Adoption, AdoptionProps } from 'src/domain/entities/adoption';

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