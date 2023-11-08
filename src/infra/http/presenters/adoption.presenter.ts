import { Adoption } from 'src/domain/entities/adoption';

export class AdoptionPresenter {
  static toHttp(adoption: Adoption) {
    return { 
      id: adoption.id.toString(),
      orgId: adoption.orgId.toString(),
      petId: adoption.petId.toString(),
      requirements: adoption.requirements,
    };
  }
}