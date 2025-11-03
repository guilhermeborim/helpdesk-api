import { PrismaServiceRepository } from "@/repositories/prisma/prisma-service-repository";
import { PatchServiceUseCase } from "../service/patch";

export function makePatchServiceUseCase() {
  const serviceRepository = new PrismaServiceRepository();
  const patchService = new PatchServiceUseCase(serviceRepository);

  return patchService;
}
