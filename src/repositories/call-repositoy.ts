import { Call, Prisma } from "@prisma/client";

export interface CallRepository {
  create(data: Prisma.CallCreateInput): Promise<Call>;
  // update(data: Prisma.CallUpdateInput, id: string): Promise<Call>;
  get(): Promise<Call[] | []>;
  findById(id: string): Promise<Call | null>;
  findByIdUser(id: string): Promise<Call[] | null>;
  findByIdTech(id: string): Promise<Call[] | null>;
}
