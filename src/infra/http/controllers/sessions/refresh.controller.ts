import { FastifyReply, FastifyRequest } from 'fastify';

export async function refresh(req: FastifyRequest, reply: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true });

  // by convention, the user ID is assigned in "sub" attribute of JWT
  const token = await reply.jwtSign({
    sign: {
      sub: req.user.sub,
      expiresIn: '15m',
    },
  });

  const newRefreshToken = await reply.jwtSign({
    sign: {
      sub: req.user.sub,
      expiresIn: '7d',
    },
  });

  return reply
    .setCookie('refreshToken', newRefreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ access_token: token });
} 