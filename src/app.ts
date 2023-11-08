import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { petsRoutes } from './infra/http/controllers/pet/routes';
import { organizationsRoutes } from './infra/http/controllers/organization/routes';
import { WrongTypeError } from './core/errors/custom-errors';
import { adoptionsRoutes } from './infra/http/controllers/adoption/routes';
import { fastifyJwt } from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import { sessionsRoutes } from './infra/http/controllers/sessions/routes';

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
});
app.register(fastifyCookie);
app.register(sessionsRoutes);
app.register(petsRoutes);
app.register(organizationsRoutes);
app.register(adoptionsRoutes);

app.setErrorHandler((err, _, res) => {
  if (err instanceof ZodError) {
    return res.status(400).send(
      { message: 'Validation error', issues: err.format() }
    );
  } else if (err instanceof WrongTypeError) {
    return res.status(400).send(
      { message: 'Validation error', issues: err.message }
    );
  }

  if (env.NODE_ENV !== 'prd') {
    console.error(err);
  } else {
    // TODO: Here we should log to external tool like NewRelic or Sentry
  }

  return res.status(500).send({ message: err.message });
});