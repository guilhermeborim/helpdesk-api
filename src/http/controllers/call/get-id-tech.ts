import { makeGetByIdTechCallUseCase } from "@/services/factories/make-get-idtech-call-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getByIdTech(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    id: z.string(),
  });
  try {
    const { id } = bodySchema.parse(request.params);
    const getCalls = makeGetByIdTechCallUseCase();

    const { calls } = await getCalls.execute(id);

    return reply.status(200).send({ calls });
  } catch (error) {
    throw error;
  }
}
