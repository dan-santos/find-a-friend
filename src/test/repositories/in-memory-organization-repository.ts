import { Organization } from 'src/domain/entities/organization';
import { IOrganizationRepository } from 'src/domain/repositories/organization.repository';

export class InMemoryOrganizationRepository implements IOrganizationRepository {
  public items: Organization[] = [];

  async create(organization: Organization): Promise<void> {
    this.items.push(organization);
  }
  
}