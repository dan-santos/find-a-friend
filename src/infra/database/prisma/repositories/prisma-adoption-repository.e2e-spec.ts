import { app } from 'src/app';
import { makePrismaOrganization } from 'src/test/factories/make-organization';
import { PrismaAdapter } from 'src/infra/database/prisma/prisma.adapter';
import { makePrismaPet } from 'src/test/factories/make-pet';
import { makePrismaAdoption } from 'src/test/factories/make-adoption';
import { RedisCacheRepository } from 'src/infra/cache/redis/redis-cache-repository';
import { PrismaAdoptionRepository } from './prisma-adoption-repository';

let prismaService: PrismaAdapter;
let cacheRepository: RedisCacheRepository;
let adoptionRepository: PrismaAdoptionRepository;

describe('[e2e] Get cached adoption', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    prismaService = new PrismaAdapter();
    cacheRepository = new RedisCacheRepository();
    adoptionRepository = new PrismaAdoptionRepository(cacheRepository, prismaService);
  });

  it('should be able to persist adoption details on redis cache', async () => {
    const org = await makePrismaOrganization(prismaService);
    const pet = await makePrismaPet(prismaService, { orgId: org.id });
    await makePrismaAdoption(prismaService, { petId: pet.id, orgId: org.id });

    const adoptionDetails = await adoptionRepository.findByPetId(pet.id.toString());

    const cached = await cacheRepository.get(`adoption:pet:${pet.id.toString()}`);

    expect(cached).toEqual(JSON.stringify(adoptionDetails));
  });

  it('should be return cached data on subsequent calls', async () => {
    const org = await makePrismaOrganization(prismaService);
    const pet = await makePrismaPet(prismaService, { orgId: org.id });
    await makePrismaAdoption(prismaService, { petId: pet.id, orgId: org.id });

    // the next line works as if a call to the findByPetId had already been called previously, 
    // and the content of the response was what was passed as a parameter
    await cacheRepository.set(`adoption:pet:${pet.id.toString()}`, JSON.stringify({ mockedContent: true }));

    const adoptionDetails = await adoptionRepository.findByPetId(pet.id.toString());

    expect(adoptionDetails).toEqual({ mockedContent: true });
  });
});