import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ClientsUserUseCase } from "../users/clients";

export function makeClientsUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const clientsService = new ClientsUserUseCase(usersRepository);

  return clientsService;
}
