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

  static toHttpWithDetails(pet: Pet) {
    return { 
      id: pet.id.toString(),
      orgId: pet.orgId.toString(),
      name: pet.name,
      description: pet.description,
      age: pet.age,
      size: pet.size,
      energy: pet.energy,
      independency: pet.independency,
      environment: pet.environment,
      photosIds: pet.photosIds
    };
  }
}