import { fakerPT_BR as faker } from '@faker-js/faker';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { Organization, OrganizationProps } from 'src/domain/entities/organization';

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
    password: '123456',
    ...override,
  },
  id,
  );

  return fakeOrganization;
}