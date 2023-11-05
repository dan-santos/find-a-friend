import { Pet, PetProps } from 'src/domain/entities/pet';
import { IPetRepository } from 'src/domain/repositories/pet.repository';
import { PrismaPetMapper } from '../mappers/pet-mapper';
import { PrismaAdapter } from '../prisma.adapter';

export class PrismaPetRepository implements IPetRepository {
  private prisma = new PrismaAdapter();

  async create(pet: Pet): Promise<void> {
    const data = PrismaPetMapper.toPrisma(pet);
    await this.prisma.pet.create({
      data
    });
  }

  async findManyByQuery(orgIds: string[], query?: Partial<PetProps> | undefined): Promise<Pet[]> {
    const pets = await this.prisma.pet.findMany({
      where: {
        organizationId: {
          in: orgIds,
        },
        age: query?.age,
        energy: query?.energy,
        environment: query?.environment,
        independency: query?.independency,
        name: query?.name,
        size: query?.size,
      }
    });

    return pets.map(PrismaPetMapper.toDomain);
  }
  
  async findById(petId: string): Promise<Pet | null> {
    const pet = await this.prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    if (!pet) return null;
    return PrismaPetMapper.toDomain(pet);
  }
}