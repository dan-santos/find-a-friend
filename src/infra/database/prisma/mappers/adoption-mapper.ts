import { Adoption } from 'src/domain/entities/adoption';
import { Adoption as PrismaAdoption, Prisma } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';

export class PrismaAdoptionMapper {
  static toDomain(raw: PrismaAdoption): Adoption {
    return Adoption.create(
      {
        orgId: new UniqueEntityID(raw.organizationId),
        petId: new UniqueEntityID(raw.petId),
        requirements: raw.requirements,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(raw: Adoption): Prisma.AdoptionUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      petId: raw.petId.toString(),
      organizationId: raw.orgId.toString(),
      requirements: raw.requirements,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    };
  }
}