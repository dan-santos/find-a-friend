import { Organization } from '../entities/organization';

export interface IOrganizationRepository {
  create(organization: Organization): Promise<void>;
  findByEmail(organizationEmail: string): Promise<Organization | null>;
}