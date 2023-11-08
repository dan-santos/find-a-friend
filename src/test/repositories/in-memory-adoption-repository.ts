import { Adoption } from 'src/domain/entities/adoption';
import { IAdoptionRepository } from 'src/domain/repositories/adoption.repository';
import { AdoptionDetails } from 'src/infra/database/prisma/mappers/adoption-mapper';
import { InMemoryPetRepository } from './in-memory-pet-repository';
import { InMemoryOrganizationRepository } from './in-memory-organization-repository';

export class InMemoryAdoptionRepository implements IAdoptionRepository {
  constructor(
    private petRepository: InMemoryPetRepository,
    private organizationRepository: InMemoryOrganizationRepository
  ){}

  public items: Adoption[] = [];

  async create(adoption: Adoption): Promise<void> {
    this.items.push(adoption);
  }

  async findByPetId(petId: string): Promise<AdoptionDetails | null> {
    const adoption = this.items.find(adp => adp.petId.toString() === petId);
    if (!adoption) return null;
    
    const associatedOrg = await this.organizationRepository.findById(adoption.orgId.toString());
    if (!associatedOrg) return null;

    const associatedPet = await this.petRepository.findById(adoption.petId.toString());
    if (!associatedPet) return null;

    return {
      adoption,
      organization: associatedOrg,
      pet: associatedPet
    };
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