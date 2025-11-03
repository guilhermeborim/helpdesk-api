import { CallService, Prisma } from "@prisma/client";

export interface CallServiceRepository {
  create(data: Prisma.CallServiceCreateInput): Promise<CallService>;
}
