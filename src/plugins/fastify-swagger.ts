import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fp from 'fastify-plugin';

// fastifySwagger plugin
export const fastifySwaggerPlugin = fp(async function(fastify: FastifyInstance){
  fastify.register(fastifySwagger, {
    mode: 'static',
    specification: {
      baseDir: './',
      path: 'swagger.json',
    },
  });
});

// swaggerUi plugin
export const swaggerUiPlugin = fp(async function (fastify: FastifyInstance) {
  fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      deepLinking: true,
      displayRequestDuration: true,
      filter: true,
    }
  });
});