import { FastifyInstance } from 'fastify';
import { fastifyJwt } from '@fastify/jwt';
import fp from 'fastify-plugin';

// fastifyJwt plugin
export const fastifyJwtPlugin = fp(async function(fastify: FastifyInstance){
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
});