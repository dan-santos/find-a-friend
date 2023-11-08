import { Organization } from 'src/domain/entities/organization';

export class OrganizationPresenter {
  static toHttp(organization: Organization) {
    return { 
      id: organization.id.toString(),
      responsableName: organization.responsableName,
      phone: organization.phone,
      address: organization.address,
      cep: organization.cep,
      email: organization.email
    };
  }
}