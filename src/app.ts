import fastify from 'fastify';
import { ZodError } from 'zod';
import { env } from './env';
import { petsRoutes } from './infra/http/controllers/pet/routes';
import { organizationsRoutes } from './infra/http/controllers/organization/routes';
import { WrongTypeError } from './core/errors/custom-errors';

export const app = fastify();

app.register(petsRoutes);
app.register(organizationsRoutes);

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