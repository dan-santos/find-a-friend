import { AdoptionDetails } from 'src/infra/database/prisma/mappers/adoption-mapper';
import { PetPresenter } from './pet.presenter';
import { OrganizationPresenter } from './organization.presenter';

export class AdoptionDetailsPresenter {
  static toHttp({ adoption, pet, organization }: AdoptionDetails) {
    return { 
      adoption: {
        id: adoption.id.toString(),
        orgId: adoption.orgId.toString(),
        petId: adoption.petId.toString(),
        requirements: adoption.requirements,
      },
      pet: PetPresenter.toHttp(pet),
      organization: OrganizationPresenter.toHttp(organization)
    };
  }
}