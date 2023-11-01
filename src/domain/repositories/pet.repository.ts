import { Pet, PetProps } from '../entities/pet';

export interface IPetRepository {
  create(pet: Pet): Promise<void>;
  findManyByQuery(orgIds: string[], query?: Partial<PetProps>): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | null>;
}