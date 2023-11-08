import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { makePublishAdoptionUseCase } from 'src/infra/factories/make-publish-adoption-use-case';

export async function publish(req: FastifyRequest, reply: FastifyReply) {
  const params = z.object({
    petId: z.string().uuid(),
    orgId: z.string().uuid(),
    requirements: z.array(z.string())
  });

  const publishSchema = params.parse(req.body);

  const publishAdoptionUseCase = makePublishAdoptionUseCase();

  await publishAdoptionUseCase.execute({ 
    petId: publishSchema.petId,
    orgId: publishSchema.orgId,
    adoptionRequirements: publishSchema.requirements
  });

  return reply.status(201).send();
}