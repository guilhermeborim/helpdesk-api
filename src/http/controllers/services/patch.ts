import { ServiceNotExists } from "@/services/errors/service-not-exists";
import { makePatchServiceUseCase } from "@/services/factories/make-patch-service-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function patch(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  if (!id) {
    return reply.status(400).send({ message: "ID do serviço é obrigatório" });
  }

  const patchBodySchema = z.object({
    name: z.string().optional(),
    price: z.number().min(0).optional(),
    active: z.boolean().optional(),
  });

  const { name, price, active } = patchBodySchema.parse(request.body);

  try {
    const patchService = makePatchServiceUseCase();

    const payload: any = { id: id };
    if (name !== undefined) payload.name = name;
    if (price !== undefined) payload.price = price;
    if (active !== undefined) payload.active = active;

    await patchService.execute(payload);

    return reply.status(204).send();
  } catch (error) {
    if (error instanceof ServiceNotExists) {
      return reply.status(404).send({ message: error.message });
    }
    throw error;
  }
}
