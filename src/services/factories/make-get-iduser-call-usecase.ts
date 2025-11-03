import { PrismaCallRepository } from "@/repositories/prisma/prisma-call-repository";
import { GetCallsByIdUserUseCase } from "../call/get-id-user";

export function makeGetByIdUserCallUseCase() {
  const callRepository = new PrismaCallRepository();
  const getCallsByIdUser = new GetCallsByIdUserUseCase(callRepository);

  return getCallsByIdUser;
}
