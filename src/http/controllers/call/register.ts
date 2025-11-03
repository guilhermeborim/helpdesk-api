import { makeRegisterCallUseCase } from "@/services/factories/make-register-call-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string("Nome é obrigatório"),
    description: z.string("Descrição é obrigatória"),
    clientId: z.string("ID inválido"),
    serviceId: z.string("ID inválido"),
  });

  const { name, description, serviceId, clientId } = registerBodySchema.parse(
    request.body
  );

  try {
    const registerCall = makeRegisterCallUseCase();

    await registerCall.execute({
      name,
      description,
      status: "ABERTO",
      clientId,
      serviceId,
    });

    return reply.status(201).send();
  } catch (error) {
    throw error;
  }
}
