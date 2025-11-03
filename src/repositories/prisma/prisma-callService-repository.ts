import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { CallServiceRepository } from "../callService-repositoy";

export class PrismaCallServiceRepository implements CallServiceRepository {
  async create(data: Prisma.CallServiceCreateInput) {
    const callService = await prisma.callService.create({
      data,
    });

    return callService;
  }
}
