import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { RegisterUserUseCase } from "../users/register";

export function makeRegisterUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const registerService = new RegisterUserUseCase(usersRepository);

  return registerService;
}
