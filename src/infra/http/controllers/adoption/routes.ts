import { FastifyInstance } from 'fastify';
import { getByPetId } from './get-by-pet-id.controller';
import { publish } from './publish.controller';

export async function adoptionsRoutes(app: FastifyInstance) {
  app.post('/adoptions', publish);
  app.get('/adoptions/pets/:petId', getByPetId);
}