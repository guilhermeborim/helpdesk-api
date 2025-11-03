import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repositoy";

export class PrismaUsersRepository implements UsersRepository {
  async findByUsersTec() {
    const tec = await prisma.user.findMany({
      where: {
        role: "TECNICO",
      },
    });

    return tec;
  }
  async findByUsersClient() {
    const clients = await prisma.user.findMany({
      where: {
        role: "CLIENTE",
      },
    });

    return clients;
  }
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
