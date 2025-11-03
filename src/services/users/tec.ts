import { UsersRepository } from "@/repositories/users-repositoy";
import { User } from "@prisma/client";
import { UserNotExists } from "../errors/user-not-exists";

interface TecUserUseCaseResponse {
  user: Omit<User[], "password">;
}

export class TecUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<TecUserUseCaseResponse> {
    const user = await this.usersRepository.findByUsersTec();

    if (!user) {
      throw new UserNotExists();
    }

    return {
      user,
    };
  }
}
