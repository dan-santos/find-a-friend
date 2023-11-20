import { Adoption } from 'src/domain/entities/adoption';
import { IAdoptionRepository } from 'src/domain/repositories/adoption.repository';
import { AdoptionDetails, PrismaAdoptionMapper } from '../mappers/adoption-mapper';
import { PrismaAdapter } from '../prisma.adapter';
import { ICacheRepository } from 'src/infra/cache/cache-repository';

export class PrismaAdoptionRepository implements IAdoptionRepository {
  constructor(
    private cache: ICacheRepository,
    private prisma: PrismaAdapter
  ) {}

  async create(adoption: Adoption): Promise<void> {
    const data = PrismaAdoptionMapper.toPrisma(adoption);
    await this.prisma.adoption.create({
      data
    });
  }

  async findByPetId(petId: string): Promise<AdoptionDetails | null> {
    const cacheHit = await this.cache.get(`adoption:pet:${petId}`);
    if (cacheHit) return JSON.parse(cacheHit);

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

    const adoptionDetails = PrismaAdoptionMapper.toDomainWithDetails(adoption);
    await this.cache.set(`adoption:pet:${petId}`, JSON.stringify(adoptionDetails));
    return adoptionDetails;
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