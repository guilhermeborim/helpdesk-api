import { UserAlreadyExistsError } from "@/services/errors/user-already-exists";
import { makeRegisterUserUseCase } from "@/services/factories/make-register-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string().min(6),
    role: z.enum(["ADMIN", "TECNICO", "CLIENTE"]).default("CLIENTE"),
  });

  const { name, email, password, role } = registerBodySchema.parse(
    request.body
  );

  try {
    const registerService = makeRegisterUserUseCase();

    await registerService.execute({
      name,
      email,
      password,
      role,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message });
    }

    throw error;
  }
}
