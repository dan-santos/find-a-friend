import { Organization } from '../entities/organization';

export interface IOrganizationRepository {
  create(organization: Organization): Promise<void>;
}