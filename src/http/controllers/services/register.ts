import { makeRegisterServiceUseCase } from "@/services/factories/make-register-service-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string("Nome é obrigatório"),
    price: z.number("Preço é obrigatório").min(0),
  });

  const { name, price } = registerBodySchema.parse(request.body);

  try {
    const registerService = makeRegisterServiceUseCase();

    await registerService.execute({
      name,
      price,
    });
  } catch (error) {
    throw error;
  }

  return reply.status(201).send();
}
