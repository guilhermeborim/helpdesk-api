import { CallRepository } from "@/repositories/call-repositoy";
import { Call } from "@prisma/client";

interface GetCallsResponse {
  calls: Call[] | [];
}

export class GetCallsUseCase {
  constructor(private callRepository: CallRepository) {}

  async execute(): Promise<GetCallsResponse> {
    const calls = await this.callRepository.get();

    return {
      calls,
    };
  }
}
