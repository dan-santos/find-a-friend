import { FastifyInstance } from 'fastify';
import { getByPetId } from './get-by-pet-id.controller';
import { publish } from './publish.controller';
import { verifyJWT } from '../../middlewares/verify-jwt';

export async function adoptionsRoutes(app: FastifyInstance) {
  app.post('/adoptions', { onRequest: [verifyJWT] }, publish);
  app.get('/adoptions/pets/:petId', getByPetId);
}