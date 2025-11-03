import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CallRepository } from "../call-repositoy";

export class PrismaCallRepository implements CallRepository {
  async findById(id: string) {
    const call = await prisma.call.findUnique({
      where: { id },
    });

    return call;
  }

  async findByIdUser(id: string) {
    const calls = await prisma.call.findMany({
      where: {
        clientId: id,
      },
      include: {
        client: true,
        technician: true,
      },
    });

    return calls;
  }

  async findByIdTech(id: string) {
    const calls = await prisma.call.findMany({
      where: {
        technicianId: id,
      },
      include: {
        client: true,
        technician: true,
      },
    });

    return calls;
  }

  async update(data: Prisma.CallUpdateInput, id: string) {
    const call = await prisma.call.update({
      data,
      where: { id },
    });

    return call;
  }
  async get() {
    const calls = await prisma.call.findMany({
      include: {
        client: {
          omit: {
            availability: true,
            createdAt: true,
            email: true,
            password: true,
            role: true,
            updatedAt: true,
          },
        },
        technician: {
          omit: {
            availability: true,
            createdAt: true,
            email: true,
            password: true,
            role: true,
            updatedAt: true,
          },
        },
      },
    });

    return calls;
  }

  async create(data: Prisma.CallCreateInput) {
    const call = await prisma.call.create({
      data,
    });

    return call;
  }
}
