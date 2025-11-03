import { UsersRepository } from "@/repositories/users-repositoy";
import { User } from "@prisma/client";
import { UserNotExists } from "../errors/user-not-exists";

interface ProfileUserUseCaseResponse {
  user: Omit<User, "password">;
}

export class ProfileUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ id }: { id: string }): Promise<ProfileUserUseCaseResponse> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new UserNotExists();
    }

    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
    };
  }
}
