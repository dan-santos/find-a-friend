import { Pet } from '../entities/pet';

export interface IPetRepository {
  create(pet: Pet): Promise<void>;
  findManyByOrgIds(orgIds: string[]): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | null>;
}