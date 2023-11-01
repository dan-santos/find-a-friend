import { Organization } from '../entities/organization';

export interface IOrganizationRepository {
  create(organization: Organization): Promise<void>;
  findByEmail(email: string): Promise<Organization | null>;
  findManyByCity(city: string): Promise<Organization[] | null>;
}