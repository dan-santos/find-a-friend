import { FastifyReply, FastifyRequest } from 'fastify';
import { makeAuthenticateOrganizationUseCase } from 'src/infra/factories/make-authenticate-organization-use-case';
import { z } from 'zod';

export async function auth(req: FastifyRequest, reply: FastifyReply) {
  const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  const schema = authSchema.parse(req.body);

  const authenticateOrganizationUseCase = makeAuthenticateOrganizationUseCase();

  const { organization } = await authenticateOrganizationUseCase.execute({...schema});

  // by convention, the user ID is assigned in "sub" attribute of JWT
  const token = await reply.jwtSign({
    sign: {
      sub: organization.id.toString(),
      expiresIn: '15m'
    },
  });

  const refreshToken = await reply.jwtSign({
    sign: {
      sub: organization.id.toString(),
      expiresIn: '7d',
    },
  });

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      access_token: token,
    });
}