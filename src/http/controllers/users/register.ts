import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { makeRegisterUserUseCase } from "@/services/factories/make-register-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const registerService = makeRegisterUserUseCase();

    await registerService.execute({
      name,
      email,
      password,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.send(409).send({ message: error.message });
    }

    throw error;
  }
}
