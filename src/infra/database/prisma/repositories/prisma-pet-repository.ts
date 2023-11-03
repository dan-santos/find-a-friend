import { prisma } from '../prisma.service';
import { Pet, PetProps } from 'src/domain/entities/pet';
import { IPetRepository } from 'src/domain/repositories/pet.repository';
import { PrismaPetMapper } from '../mappers/pet-mapper';

export class PrismaPetRepository implements IPetRepository {
  async create(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet);
    await prisma.pet.create({
      data
    });
  }

  findManyByQuery(orgIds: string[], query?: Partial<PetProps> | undefined): Promise<Pet[]> {
    throw new Error('Method not implemented.');
  }
  
  findById(petId: string): Promise<Pet | null> {
    throw new Error('Method not implemented.');
  }
}