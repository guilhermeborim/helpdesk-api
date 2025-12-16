import { UsersRepository } from "@/repositories/users-repositoy";
import { Role } from "@prisma/client";
import { hash } from "bcryptjs";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ name, email, password, role }: RegisterUserUseCaseRequest) {
    const password_hash = await hash(password, 6);
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      role,
    });
  }
}
