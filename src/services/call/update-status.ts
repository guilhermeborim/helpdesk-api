import { CallRepository } from "@/repositories/call-repositoy";
import { CallStatus } from "@prisma/client";
import { CallNotAssigned } from "../errors/call-not-assigned";
import { CallNotExists } from "../errors/call-not-exists";
import { InvalidStatusTransition } from "../errors/invalid-status-transition";

const statusOrder: Record<CallStatus, number> = {
  ABERTO: 0,
  EM_ATENDIMENTO: 1,
  ENCERRADO: 2,
};

interface UpdateCallStatusRequest {
  id: string;
  status: CallStatus;
  technicianId: string;
}

export class UpdateCallStatusUseCase {
  constructor(private callRepository: CallRepository) {}

  async execute({ id, status, technicianId }: UpdateCallStatusRequest) {
    const call = await this.callRepository.findById(id);

    if (!call) {
      throw new CallNotExists();
    }

    if (call.technicianId !== technicianId) {
      throw new CallNotAssigned();
    }

    if (statusOrder[status] <= statusOrder[call.status]) {
      throw new InvalidStatusTransition();
    }

    const updatedCall = await this.callRepository.update({ status }, id);

    return { call: updatedCall };
  }
}
