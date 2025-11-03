import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ServiceRepository } from "../service-repositoy";

export class PrismaServiceRepository implements ServiceRepository {
  async findyById(id: string) {
    const service = await prisma.service.findUnique({
      where: { id },
    });

    return service;
  }
  async update(data: Prisma.ServiceUpdateInput, id: string) {
    const service = await prisma.service.update({
      data,
      where: { id },
    });

    return service;
  }
  async get() {
    const services = await prisma.service.findMany({});

    return services;
  }

  async create(data: Prisma.ServiceCreateInput) {
    const service = await prisma.service.create({
      data,
    });

    return service;
  }
}
