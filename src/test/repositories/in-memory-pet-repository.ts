import { Pet, PetProps } from 'src/domain/entities/pet';
import { IPetRepository } from 'src/domain/repositories/pet.repository';

export class InMemoryPetRepository implements IPetRepository {
  public items: Pet[] = [];

  async create(pet: Pet): Promise<void> {
    this.items.push(pet);
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = this.items.find(pet => pet.id.toString() === petId);

    if (!pet) return null;
    return pet;
  }

  async findManyByQuery(orgIds: string[], query?: Partial<PetProps> | undefined): Promise<Pet[]> {
    return this.items.filter((pet) => {
      if (!query) {
        return orgIds.includes(pet.orgId.toString());
      }

      const petOrgId = pet.orgId.toString();
      const { name, age, energy, environment, independency, orgId, size } = query;

      return orgIds.includes(petOrgId) && (
        pet.name === name ||
        pet.age === age ||
        pet.energy === energy ||
        pet.environment === environment ||
        pet.independency === independency ||
        pet.orgId === orgId ||
        pet.size === size
      );
    });
  }
}