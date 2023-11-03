import { Organization } from 'src/domain/entities/organization';
import { Organization as PrismaOrganization, Prisma } from '@prisma/client';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';

export class PrismaOrganizationMapper {
  static toDomain(raw: PrismaOrganization): Organization {
    return Organization.create(
      {
        address: raw.address,
        cep: raw.cep,
        email: raw.email,
        password: raw.passwordHash,
        phone: raw.phone,
        responsableName: raw.responsableName,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(raw: Organization): Prisma.OrganizationUncheckedCreateInput {
    return {
      id: raw.id.toString(),
      address: raw.address,
      cep: raw.cep,
      email: raw.email,
      passwordHash: raw.password,
      phone: raw.phone,
      responsableName: raw.responsableName,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    };
  }
}