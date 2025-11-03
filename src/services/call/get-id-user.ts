import { CallRepository } from "@/repositories/call-repositoy";
import { Call } from "@prisma/client";

interface GetCallsByIdUserResponse {
  calls: Call[] | null;
}

export class GetCallsByIdUserUseCase {
  constructor(private callRepository: CallRepository) {}

  async execute(id: string): Promise<GetCallsByIdUserResponse> {
    const calls = await this.callRepository.findByIdUser(id);

    return {
      calls,
    };
  }
}
