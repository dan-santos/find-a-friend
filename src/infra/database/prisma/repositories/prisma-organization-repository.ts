import { Organization } from 'src/domain/entities/organization';
import { IOrganizationRepository } from 'src/domain/repositories/organization.repository';
import { PrismaOrganizationMapper } from '../mappers/organization-mapper';
import { PrismaAdapter } from '../prisma.adapter';

export class PrismaOrganizationRepository implements IOrganizationRepository {  
  
  private prisma = new PrismaAdapter();

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await this.prisma.organization.findUnique({
      where: {
        email,
      },
    });

    if (!organization) return null;
    return PrismaOrganizationMapper.toDomain(organization);
  }

  async findManyByCity(city: string): Promise<Organization[] | null> {
    const organizations = await this.prisma.organization.findMany({
      where: {
        address: {
          contains: city
        }
      },
    });

    return organizations.map(PrismaOrganizationMapper.toDomain);
  }

  async create(organization: Organization): Promise<void> {
    const data = PrismaOrganizationMapper.toPrisma(organization);
    await this.prisma.organization.create({
      data
    });
  }
}