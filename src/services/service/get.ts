import { ServiceRepository } from "@/repositories/service-repositoy";
import { Service } from "@prisma/client";

interface GetServiceResponse {
  services: Service[] | [];
}

export class GetServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute(): Promise<GetServiceResponse> {
    const services = await this.serviceRepository.get();

    return {
      services,
    };
  }
}
