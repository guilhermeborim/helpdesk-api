import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUserUseCase } from "../users/authenticate";

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const authenticateService = new AuthenticateUserUseCase(usersRepository);

  return authenticateService;
}
