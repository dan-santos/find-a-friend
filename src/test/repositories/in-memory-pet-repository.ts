import { Pet } from 'src/domain/entities/pet';
import { IPetRepository } from 'src/domain/repositories/pet.repository';

export class InMemoryPetRepository implements IPetRepository {
  public items: Pet[] = [];

  async create(pet: Pet): Promise<void> {
    this.items.push(pet);
  }
  
  async findManyByOrgIds(orgIds: string[]): Promise<Pet[]> {
    return this.items.filter(pet => orgIds.includes(pet.orgId.toString()));
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = this.items.find(pet => pet.id.toString() === petId);

    if (!pet) return null;
    return pet;
  }
}