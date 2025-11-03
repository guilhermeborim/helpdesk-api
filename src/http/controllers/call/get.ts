import { makeGetCallUseCase } from "@/services/factories/make-get-call-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getCall = makeGetCallUseCase();

    const { calls } = await getCall.execute();
    return reply.status(200).send({ calls });
  } catch (error) {
    throw error;
  }
}
