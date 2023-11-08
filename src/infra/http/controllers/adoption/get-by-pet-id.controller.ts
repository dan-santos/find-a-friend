import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makeGetAdoptionByPetIdUseCase } from 'src/infra/factories/make-get-adoption-by-pet-id-use-case';
import { AdoptionPresenter } from '../../presenters/adoption.presenter';

export async function getByPetId(req: FastifyRequest, reply: FastifyReply) {
  const params = z.object({
    petId: z.string().uuid(),
  });

  const getSchema = params.parse(req.params);

  const getAdoptionUseCase = makeGetAdoptionByPetIdUseCase();

  const { adoption } = await getAdoptionUseCase.execute({ 
    petId: getSchema.petId
  });

  return reply.status(200).send({ adoption: AdoptionPresenter.toHttp(adoption) });
}