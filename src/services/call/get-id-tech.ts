import { CallRepository } from "@/repositories/call-repositoy";
import { Call } from "@prisma/client";

interface GetCallsByIdTechResponse {
  calls: Call[] | null;
}

export class GetCallsByIdTechUseCase {
  constructor(private callRepository: CallRepository) {}

  async execute(id: string): Promise<GetCallsByIdTechResponse> {
    const calls = await this.callRepository.findByIdTech(id);

    return {
      calls,
    };
  }
}
