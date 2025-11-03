import { UserNotExists } from "@/services/errors/user-not-exists";
import { makeProfileUserUseCase } from "@/services/factories/make-profile-usecase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user;
  try {
    const profileService = makeProfileUserUseCase();

    const { user } = await profileService.execute({
      id: sub,
    });

    return reply.status(200).send({ user });
  } catch (error) {
    if (error instanceof UserNotExists) {
      return reply.send(404).send({ message: error.message });
    }

    throw error;
  }
}
