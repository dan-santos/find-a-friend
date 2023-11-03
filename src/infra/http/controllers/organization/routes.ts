import { FastifyInstance } from 'fastify';
import { create } from './create.controller';

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', create);
}