import { FastifyReply, FastifyRequest } from 'fastify';
import { makeGetPetUseCase } from 'src/infra/factories/make-get-pet-use-case';
import { z } from 'zod';
import { PetPresenter } from '../../presenters/pet.presenter';

export async function get(req: FastifyRequest, reply: FastifyReply) {
  const params = z.object({
    id: z.string().uuid(),
  });

  const getSchema = params.parse(req.params);

  const getPetUseCase = makeGetPetUseCase();

  const { pet } = await getPetUseCase.execute({ 
    petId: getSchema.id
  });

  return reply.status(200).send({ pet: PetPresenter.toHttpWithDetails(pet) });
}