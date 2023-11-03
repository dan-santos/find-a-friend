import { Pet } from 'src/domain/entities/pet';
import { Pet as PrismaPet, Prisma } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';

export class PrismaPetMapper {
  static toDomain(raw: PrismaPet): Pet {
    return Pet.create(
      {
        name: raw.name,
        orgId: new UniqueEntityID(raw.organizationId),
        age: raw.age,
        description: raw.description,
        energy: raw.energy,
        environment: raw.environment,
        independency: raw.independency,
        size: raw.size,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        photosIds: raw.photosIds
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(raw: Pet): Prisma.PetUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      organizationId: raw.orgId.toString(),
      name: raw.name,
      age: raw.age,
      description: raw.description,
      energy: raw.energy,
      environment: raw.environment,
      independency: raw.independency,
      size: raw.size,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      photosIds: raw.photosIds
    };
  }
}