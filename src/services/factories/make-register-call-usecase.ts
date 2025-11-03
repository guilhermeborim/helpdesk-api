import { PrismaCallRepository } from "@/repositories/prisma/prisma-call-repository";
import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterCallUseCase } from "../call/register";

export function makeRegisterCallUseCase() {
  const callRepository = new PrismaCallRepository();
  const serviceRepository = new PrismaServiceRepository();
  const usersRepository = new PrismaUsersRepository();
  const registerCall = new RegisterCallUseCase(
    callRepository,
    serviceRepository,
    usersRepository
  );

  return registerCall;
}
