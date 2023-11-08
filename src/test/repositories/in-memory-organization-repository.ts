import { Organization } from 'src/domain/entities/organization';
import { IOrganizationRepository } from 'src/domain/repositories/organization.repository';

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  public items: Organization[] = [];

  async create(organization: Organization): Promise<void> {
    this.items.push(organization);
  }

  async findByEmail(organizationEmail: string): Promise<Organization | null> {
    const organization = this.items.find(org => org.email === organizationEmail);
    if (!organization) return null;
    return organization;
  }

  async findById(organizationId: string): Promise<Organization | null> {
    const organization = this.items.find(org => org.id.toString() === organizationId);
    if (!organization) return null;
    return organization;
  }

  async findManyByCity(city: string): Promise<Organization[] | null> {
    const organizations = this.items.filter(org => org.address.includes(city) || org.address === city);
    return organizations;
  }
}