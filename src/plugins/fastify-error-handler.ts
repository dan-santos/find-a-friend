import { FastifyReply, FastifyRequest } from 'fastify';
import { WrongTypeError } from 'src/core/errors/custom-errors';
import { env } from 'src/env';
import { ZodError } from 'zod';

export function fastifyErrorInterceptor(err: Error, _: FastifyRequest, res: FastifyReply) {
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
}