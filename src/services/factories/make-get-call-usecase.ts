import { PrismaCallRepository } from "@/repositories/prisma/prisma-call-repository";
import { GetCallsUseCase } from "../call/get";

export function makeGetCallUseCase() {
  const callRepository = new PrismaCallRepository();
  const getCall = new GetCallsUseCase(callRepository);

  return getCall;
}
