import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreateOrganizationUseCase } from 'src/infra/factories/make-create-organization-use-case';
import { z } from 'zod';

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createOrganizationSchema = z.object({
    responsableName: z.string(),
    email: z.string().email(),
    cep: z.string(),
    phone: z.string(),
    address: z.string(),
    password: z.string().min(6)
  });

  const schema = createOrganizationSchema.parse(req.body);

  const createOrganizationUseCase = makeCreateOrganizationUseCase();

  await createOrganizationUseCase.execute({...schema});

  reply.status(201).send();
}