import { Adoption } from 'src/domain/entities/adoption';
import { IAdoptionRepository } from 'src/domain/repositories/adoption.repository';

export class InMemoryAdoptionRepository implements IAdoptionRepository {
  public items: Adoption[] = [];

  async create(adoption: Adoption): Promise<void> {
    this.items.push(adoption);
  }

  async findByPetId(petId: string): Promise<Adoption | null> {
    const adoption = this.items.find(adp => adp.petId.toString() === petId);
    if (!adoption) return null;
    return adoption;
  }

  async findManyByOrgId(orgId: string): Promise<Adoption[]> {
    const adoptions = this.items.filter(adp => adp.orgId.toString() === orgId);

    return adoptions;
  }

  async findById(adoptionId: string): Promise<Adoption | null> {
    const adoption = this.items.find(adp => adp.id.toString() === adoptionId);
    if (!adoption) return null;
    return adoption;
  }
}