import { PrismaCallRepository } from "@/repositories/prisma/prisma-call-repository";
import { GetCallsByIdTechUseCase } from "../call/get-id-tech";

export function makeGetByIdTechCallUseCase() {
  const callRepository = new PrismaCallRepository();
  const getCallsByIdTech = new GetCallsByIdTechUseCase(callRepository);

  return getCallsByIdTech;
}
