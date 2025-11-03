import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { GetServiceUseCase } from "../service/get";

export function makeGetServiceUseCase() {
  const serviceRepository = new PrismaServiceRepository();
  const getService = new GetServiceUseCase(serviceRepository);

  return getService;
}
