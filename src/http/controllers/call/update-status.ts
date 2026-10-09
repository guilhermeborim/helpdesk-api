import { CallNotAssigned } from "@/services/errors/call-not-assigned";
import { CallNotExists } from "@/services/errors/call-not-exists";
import { InvalidStatusTransition } from "@/services/errors/invalid-status-transition";
import { makeUpdateCallStatusUseCase } from "@/services/factories/make-update-status-call-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function updateStatus(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    id: z.string("ID inválido"),
  });

  const bodySchema = z.object({
    status: z.enum(["ABERTO", "EM_ATENDIMENTO", "ENCERRADO"], "Status inválido"),
  });

  const { id } = paramsSchema.parse(request.params);
  const { status } = bodySchema.parse(request.body);

  try {
    const updateCallStatus = makeUpdateCallStatusUseCase();

    const { call } = await updateCallStatus.execute({
      id,
      status,
      technicianId: request.user.sub,
    });

    return reply.status(200).send({ call });
  } catch (error) {
    if (error instanceof CallNotExists) {
      return reply.status(404).send({ message: error.message });
    }
    if (error instanceof CallNotAssigned) {
      return reply.status(403).send({ message: error.message });
    }
    if (error instanceof InvalidStatusTransition) {
      return reply.status(409).send({ message: error.message });
    }
    throw error;
  }
}
