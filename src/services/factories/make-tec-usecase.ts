import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { TecUserUseCase } from "../users/tec";

export function makeTecUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const tecService = new TecUserUseCase(usersRepository);

  return tecService;
}
