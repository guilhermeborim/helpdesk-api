import { UserNotExists } from "@/services/errors/user-not-exists";
import { makeTecUserUseCase } from "@/services/factories/make-tec-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function tec(request: FastifyRequest, reply: FastifyReply) {
  try {
    const profileService = makeTecUserUseCase();

    const { user } = await profileService.execute();

    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof UserNotExists) {
      return reply.send(404).send({ message: error.message });
    }

    throw error;
  }
}
