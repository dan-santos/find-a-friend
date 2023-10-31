import { Organization } from '../entities/organization';
import { IOrganizationRepository } from '../repositories/organization.repository';

interface CreateOrganizationUseCaseRequest {
  responsableName: string;
  email: string;
  cep: string;
  phone: string;
  address: string;
  password: string;
}

export class CreateOrganizationUseCase {
  constructor(
    private organizationRepository: IOrganizationRepository
  ) { }

  async execute({
    responsableName, email, cep, phone, address, password
  }: CreateOrganizationUseCaseRequest): Promise<Organization> {

    const organization = Organization.create({
      responsableName,
      email,
      cep,
      phone,
      address,
      password
    });

    await this.organizationRepository.create(organization);

    return organization;
  }
}