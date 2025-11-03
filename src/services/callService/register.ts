import { CallRepository } from "@/repositories/call-repositoy";
import { CallServiceRepository } from "@/repositories/callService-repositoy";
import { CallNotExists } from "../errors/call-not-exists";

interface RegisterCallServiceRequest {
  callId: string;
  serviceId: string;
  price: number;
}

export class RegisterCallServiceUseCase {
  constructor(
    private callServiceRepository: CallServiceRepository,
    private callRepository: CallRepository
  ) {}

  async execute({ callId, price, serviceId }: RegisterCallServiceRequest) {
    const call = await this.callRepository.findById(callId);

    if (!call) {
      throw new CallNotExists();
    }

    await this.callServiceRepository.create({
      price,
      call: { connect: { id: callId } },
      service: { connect: { id: serviceId } },
    });
  }
}
