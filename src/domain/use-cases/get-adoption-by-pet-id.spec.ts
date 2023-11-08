import { InMemoryAdoptionRepository } from 'src/test/repositories/in-memory-adoption-repository';
import { makeAdoption } from 'src/test/factories/make-adoption';
import { UniqueEntityID } from 'src/core/entitites/unique-entity-id';
import { GetAdoptionByPetIdUseCase } from './get-adoption-by-pet-id';
import { InMemoryPetRepository } from 'src/test/repositories/in-memory-pet-repository';
import { InMemoryOrganizationRepository } from 'src/test/repositories/in-memory-organization-repository';
import { makeOrganization } from 'src/test/factories/make-organization';
import { makePet } from 'src/test/factories/make-pet';

let petsRepository: InMemoryPetRepository;
let orgsRepository: InMemoryOrganizationRepository;
let repository: InMemoryAdoptionRepository;
let sut: GetAdoptionByPetIdUseCase;

describe('get adoption details by pet id tests', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository();
    orgsRepository = new InMemoryOrganizationRepository();
    repository = new InMemoryAdoptionRepository(petsRepository, orgsRepository);
    sut = new GetAdoptionByPetIdUseCase(repository);
  });
  
  it('should be able to get a adoption by pet id', async () => {
    const fakeOrgId = new UniqueEntityID('some-org-id');
    const fakePetId = new UniqueEntityID('some-pet-id');

    orgsRepository.create(makeOrganization({}, fakeOrgId));
    petsRepository.create(makePet({ orgId: fakeOrgId }, fakePetId));

    repository.create(makeAdoption({ petId: fakePetId, orgId: fakeOrgId }));

    const { adoption } = await sut.execute({ petId: 'some-pet-id' });

    expect(repository.items).toHaveLength(1);
    expect(adoption).toEqual(expect.objectContaining({ 
      adoption: expect.any(Object), 
      pet: expect.any(Object), 
      organization: expect.any(Object) 
    }));
  });
});