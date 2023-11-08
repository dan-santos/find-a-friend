import { Adoption } from 'src/domain/entities/adoption';
import { IAdoptionRepository } from 'src/domain/repositories/adoption.repository';
import { AdoptionDetails, PrismaAdoptionMapper } from '../mappers/adoption-mapper';
import { PrismaAdapter } from '../prisma.adapter';

export class PrismaAdoptionRepository implements IAdoptionRepository {
  private prisma = new PrismaAdapter();

  async create(adoption: Adoption): Promise<void> {
    const data = PrismaAdoptionMapper.toPrisma(adoption);
    await this.prisma.adoption.create({
      data
    });
  }

  async findByPetId(petId: string): Promise<AdoptionDetails | null> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        petId,
      },
      include: {
        organization: true,
        pet: true
      },
    });

    if (!adoption) return null;
    return PrismaAdoptionMapper.toDomainWithDetails(adoption);
  }

  async findManyByOrgId(orgId: string): Promise<Adoption[]> {
    const adoptions = await this.prisma.adoption.findMany({
      where: {
        organizationId: orgId,
      },
    });

    return adoptions.map(PrismaAdoptionMapper.toDomain);
  }

  async findById(adoptionId: string): Promise<Adoption | null> {
    const adoption = await this.prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
    });

    if (!adoption) return null;
    return PrismaAdoptionMapper.toDomain(adoption);
  }
}