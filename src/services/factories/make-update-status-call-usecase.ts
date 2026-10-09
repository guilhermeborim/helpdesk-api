import { PrismaCallRepository } from "@/repositories/prisma/prisma-call-repository";
import { UpdateCallStatusUseCase } from "../call/update-status";

export function makeUpdateCallStatusUseCase() {
  const callRepository = new PrismaCallRepository();
  const updateCallStatus = new UpdateCallStatusUseCase(callRepository);

  return updateCallStatus;
}
