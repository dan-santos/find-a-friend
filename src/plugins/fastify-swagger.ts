import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';

// fastifySwagger plugin
export async function fastifySwaggerPlugin(fastify: FastifyInstance): Promise<void>{
  fastify.register(fastifySwagger, {
    mode: 'static',
    specification: {
      baseDir: './',
      path: 'swagger.json',
    },
  });
}

// swaggerUi plugin
export async function swaggerUiPlugin(fastify: FastifyInstance): Promise<void> {
  fastify.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      deepLinking: true,
      displayRequestDuration: true,
      filter: true,
    }
  });
}