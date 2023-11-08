import { Pet } from 'src/domain/entities/pet';

export class PetPresenter {
  static toHttp(pet: Pet) {
    return { 
      id: pet.id.toString(),
      orgId: pet.orgId.toString(),
      name: pet.name,
      photosIds: pet.photosIds
    };
  }
}