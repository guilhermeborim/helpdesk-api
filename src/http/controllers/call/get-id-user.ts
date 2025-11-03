import { makeGetByIdUserCallUseCase } from "@/services/factories/make-get-iduser-call-usecase";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";

export async function getByIdUser(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    id: z.string(),
  });
  try {
    const { id } = bodySchema.parse(request.params);
    const getCalls = makeGetByIdUserCallUseCase();

    const { calls } = await getCalls.execute(id);

    return reply.status(200).send({ calls });
  } catch (error) {
    throw error;
  }
}
