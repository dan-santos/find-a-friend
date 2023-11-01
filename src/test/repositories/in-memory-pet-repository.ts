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
}