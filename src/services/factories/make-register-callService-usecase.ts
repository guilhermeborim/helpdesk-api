import { PrismaCallRepository } from "@/repositories/prisma/prisma-call-repository";
import { PrismaCallServiceRepository } from "@/repositories/prisma/prisma-callService-repository";
import { RegisterCallServiceUseCase } from "../callService/register";

export function makeRegisterCallServiceUseCase() {
  const callRepository = new PrismaCallRepository();
  const callServiceRepository = new PrismaCallServiceRepository();
  const registerCallService = new RegisterCallServiceUseCase(
    callServiceRepository,
    callRepository
  );

  return registerCallService;
}
