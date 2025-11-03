import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { RegisterServiceUseCase } from "../service/register";

export function makeRegisterServiceUseCase() {
  const serviceRepository = new PrismaServiceRepository();
  const registerService = new RegisterServiceUseCase(serviceRepository);

  return registerService;
}
