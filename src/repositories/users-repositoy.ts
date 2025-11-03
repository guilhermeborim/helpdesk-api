import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findByUsersClient(): Promise<User[] | []>;
  findByUsersTec(): Promise<User[] | []>;
  findById(id: string): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}
