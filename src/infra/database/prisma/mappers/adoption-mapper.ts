import { Adoption } from 'src/domain/entities/adoption';
import { 
  Adoption as PrismaAdoption, 
  Pet as PrismaPet, 
  Organization as PrismaOrganization, 
  Prisma 
} from '@prisma/client';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { PrismaPetMapper } from './pet-mapper';
import { PrismaOrganizationMapper } from './organization-mapper';
import { Pet } from 'src/domain/entities/pet';
import { Organization } from 'src/domain/entities/organization';

export interface AdoptionDetails {
  adoption: Adoption,
  pet: Pet,
  organization: Organization
}

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

  static toDomainWithDetails(
    raw: PrismaAdoption & { pet: PrismaPet } & { organization: PrismaOrganization }
  ): AdoptionDetails {
    const domainAdoption = Adoption.create(
      {
        orgId: new UniqueEntityID(raw.organizationId),
        petId: new UniqueEntityID(raw.petId),
        requirements: raw.requirements,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt
      },
      new UniqueEntityID(raw.id),
    );

    return {
      adoption: domainAdoption,
      pet: PrismaPetMapper.toDomain({...raw.pet}),
      organization: PrismaOrganizationMapper.toDomain({...raw.organization}),
    };
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