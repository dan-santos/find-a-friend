import { AdoptionDetails } from 'src/infra/database/prisma/mappers/adoption-mapper';
import { Adoption } from '../entities/adoption';

export interface IAdoptionRepository {
  create(adoption: Adoption): Promise<void>;
  findByPetId(petId: string): Promise<AdoptionDetails | null>;
  findManyByOrgId(orgId: string): Promise<Adoption[]>;
  findById(adoptionId: string): Promise<Adoption | null>;
}