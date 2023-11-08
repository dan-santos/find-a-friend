import { FastifyInstance } from 'fastify';
import { auth } from './auth.controller';
import { refresh } from './refresh.controller';

export async function sessionsRoutes(app: FastifyInstance) {
  app.post('/sessions', auth);
  app.patch('/token/refresh', refresh);
}