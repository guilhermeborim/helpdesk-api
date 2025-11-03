import { UserNotExists } from "@/services/errors/user-not-exists";
import { makeClientsUserUseCase } from "@/services/factories/make-clients-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function clients(request: FastifyRequest, reply: FastifyReply) {
  try {
    const profileService = makeClientsUserUseCase();

    const { user } = await profileService.execute();

    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof UserNotExists) {
      return reply.send(404).send({ message: error.message });
    }

    throw error;
  }
}
