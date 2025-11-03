import { CallNotExists } from "@/services/errors/call-not-exists";
import { makeRegisterCallServiceUseCase } from "@/services/factories/make-register-callService-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    price: z.number("Preço do serviço é obrigatório").min(0),
    callId: z.uuid("ID inválido"),
    serviceId: z.uuid("ID inválido"),
  });

  const { price, callId, serviceId } = registerBodySchema.parse(request.body);

  try {
    const registerCallService = makeRegisterCallServiceUseCase();

    await registerCallService.execute({
      price,
      callId,
      serviceId,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof CallNotExists) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
