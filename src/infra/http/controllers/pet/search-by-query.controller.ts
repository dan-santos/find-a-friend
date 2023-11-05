import { FastifyReply, FastifyRequest } from 'fastify';
import { makeSearchPetsByQueryUseCase } from 'src/infra/factories/make-search-pets-by-query-use-case';
import { z } from 'zod';

export async function searchByQuery(req: FastifyRequest, reply: FastifyReply) {
  const fetchPetsParams = z.object({
    city: z.string(),
    name: z.string().optional(),
    age: z.coerce.number().min(0).optional(),
    size: z.enum(['Pequeno', 'Mediano', 'Grande']).optional(),
    energy: z.enum(['Baixissima', 'Baixa', 'Mediana', 'Alta', 'Altissima']).optional(),
    independency: z.enum(['Baixo', 'Moderado', 'Alto']).optional(),
    environment: z.enum(['Pequeno', 'Mediano', 'Grande']).optional()
  });

  const params = fetchPetsParams.parse(req.query);

  const createPetUseCase = makeSearchPetsByQueryUseCase();

  const { pets } = await createPetUseCase.execute({ 
    city: params.city, query: {...params} 
  });

  return reply.status(200).send({ pets });
}