import { ServiceRepository } from "@/repositories/service-repositoy";

interface RegisterServiceRequest {
  name: string;
  price: number;
}

export class RegisterServiceUseCase {
  constructor(private serviceRepository: ServiceRepository) {}

  async execute({ name, price }: RegisterServiceRequest) {
    await this.serviceRepository.create({ name, price });
  }
}
