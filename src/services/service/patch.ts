import { ServiceRepository } from "@/repositories/service-repositoy";
import { ServiceNotExists } from "../errors/service-not-exists";

interface PatchServiceRequest {
  id: string;
  name: string;
  price: number;
  active: boolean;
}

export class PatchServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({ id, name, price, active }: PatchServiceRequest) {
    const existService = await this.serviceRepository.findyById(id);

    if (!existService) {
      throw new ServiceNotExists();
    }

    const service = await this.serviceRepository.update(
      { name, price, active },
      id
    );

    return service;
  }
}
