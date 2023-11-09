import { FastifyInstance } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';

// fastifyJwt plugin
export async function fastifyJwtPlugin(fastify: FastifyInstance): Promise<void> {
  fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: process.env.JWT_EXPIRATION || '10m',
    },
  });
}