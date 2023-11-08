import { FastifyInstance } from 'fastify';
import { create } from './create.controller';
import { searchByQuery } from './search-by-query.controller';
import { get } from './get.controller';

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', create);
  app.get('/pets/:id', get);
  app.get('/pets', searchByQuery);
}