import { UsersRepository } from "@/repositories/users-repositoy";
import { User } from "@prisma/client";
import { UserNotExists } from "../errors/user-not-exists";

interface ClientsUserUseCaseResponse {
  user: Omit<User[], "password">;
}

export class ClientsUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<ClientsUserUseCaseResponse> {
    const user = await this.usersRepository.findByUsersClient();

    if (!user) {
      throw new UserNotExists();
    }

    return {
      user,
    };
  }
}
