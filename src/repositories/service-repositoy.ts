import { Prisma, Service } from "@prisma/client";

export interface ServiceRepository {
  create(data: Prisma.ServiceCreateInput): Promise<Service>;
  update(data: Prisma.ServiceUpdateInput, id: string): Promise<Service>;
  get(): Promise<Service[] | []>;
  findyById(id: string): Promise<Service | null>;
}
