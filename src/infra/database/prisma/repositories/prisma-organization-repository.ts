import { prisma } from '../prisma.service';
import { Organization } from 'src/domain/entities/organization';
import { IOrganizationRepository } from 'src/domain/repositories/organization.repository';
import { PrismaOrganizationMapper } from '../mappers/organization-mapper';

export class PrismaOrganizationRepository implements IOrganizationRepository {
  async findByEmail(email: string): Promise<Organization | null> {
    throw new Error('Method not implemented.');
  }

  async findManyByCity(city: string): Promise<Organization[] | null> {
    throw new Error('Method not implemented.');
  }

  async create(organization: Organization): Promise<void> {
    const data = PrismaOrganizationMapper.toPrisma(organization);
    await prisma.organization.create({
      data
    });
  }
}