import { Adoption } from '../entities/adoption';

export interface IAdoptionRepository {
  create(adoption: Adoption): Promise<void>;
  findByPetId(petId: string): Promise<Adoption | null>;
  findManyByOrgId(orgId: string): Promise<Adoption[]>;
  findById(adoptionId: string): Promise<Adoption | null>;
}