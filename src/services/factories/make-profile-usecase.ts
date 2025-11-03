import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { ProfileUserUseCase } from "../users/profile";

export function makeProfileUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const profileService = new ProfileUserUseCase(usersRepository);

  return profileService;
}
