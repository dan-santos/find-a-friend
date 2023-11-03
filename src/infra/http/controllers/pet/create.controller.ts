import { FastifyReply, FastifyRequest } from 'fastify';
import { makeCreatePetUseCase } from 'src/infra/factories/make-create-pet-use-case';
import { z } from 'zod';

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createPetSchema = z.object({
    orgId: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    age: z.coerce.number().min(0),
    size: z.enum(['Pequeno', 'Mediano', 'Grande']),
    energy: z.enum(['Baixissima', 'Baixa', 'Mediana', 'Alta', 'Altissima']),
    independency: z.enum(['Baixo', 'Moderado', 'Alto']),
    environment: z.enum(['Pequeno', 'Mediano', 'Grande']),
    photosIds: z.array(z.string())
  });

  const schema = createPetSchema.parse(req.body);

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute({...schema});

  reply.status(201).send();
}