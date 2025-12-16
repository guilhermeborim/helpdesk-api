import { InvalidCredentialsError } from "@/services/errors/invalid-credentials";
import { makeAuthenticateUserUseCase } from "@/services/factories/make-authenticate-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateService = makeAuthenticateUserUseCase();

    const { user } = await authenticateService.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role,
        email: user.email,
      },
      { sign: { sub: user.id } }
    );

    const { password: _, ...userData } = user;
    return reply.status(200).send({ token, userData });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message });
    }

    throw error;
  }
}
