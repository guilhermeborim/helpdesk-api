import { makeGetServiceUseCase } from "@/services/factories/make-get-service-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function get(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getService = makeGetServiceUseCase();

    const { services } = await getService.execute();
    return reply.status(200).send({ services });
  } catch (error) {
    throw error;
  }
}
