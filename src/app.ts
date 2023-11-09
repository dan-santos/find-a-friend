import fastify from 'fastify';
import { petsRoutes } from './infra/http/controllers/pet/routes';
import { organizationsRoutes } from './infra/http/controllers/organization/routes';
import { adoptionsRoutes } from './infra/http/controllers/adoption/routes';
import fastifyCookie from '@fastify/cookie';
import { sessionsRoutes } from './infra/http/controllers/sessions/routes';
import { fastifySwaggerPlugin, swaggerUiPlugin } from './plugins/fastify-swagger';
import { fastifyJwtPlugin } from './plugins/fastify-jwt';
import { fastifyErrorInterceptor } from './plugins/fastify-error-handler';

export const app = fastify();

app.register(fastifySwaggerPlugin);
app.register(swaggerUiPlugin);
app.register(fastifyJwtPlugin);
app.register(fastifyCookie);

app.register(sessionsRoutes);
app.register(petsRoutes);
app.register(organizationsRoutes);
app.register(adoptionsRoutes);

app.setErrorHandler(fastifyErrorInterceptor);