import { CallRepository } from "@/repositories/call-repositoy";
import { ServiceRepository } from "@/repositories/service-repositoy";
import { UsersRepository } from "@/repositories/users-repositoy";
import { CallStatus } from "@prisma/client";
import { NoTechnicianAvailable } from "../errors/no-technician-available";
import { ServiceNotExists } from "../errors/service-not-exists";

interface RegisterCallRequest {
  name: string;
  description: string;
  status: CallStatus;
  clientId: string;
  serviceId: string;
}

export class RegisterCallUseCase {
  constructor(
    private callRepository: CallRepository,
    private serviceRepository: ServiceRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    name,
    description,
    status,
    clientId,
    serviceId,
  }: RegisterCallRequest) {
    const service = await this.serviceRepository.findyById(serviceId);
    if (!service) {
      throw new ServiceNotExists();
    }

    const technicians = await this.usersRepository.findByUsersTec();
    const technician =
      technicians[Math.floor(Math.random() * technicians.length)];
    if (!technician) {
      throw new NoTechnicianAvailable();
    }

    await this.callRepository.create({
      name,
      description,
      status,
      servicePrice: service.price,
      client: { connect: { id: clientId } },
      technician: { connect: { id: technician.id } },
      service: { connect: { id: serviceId } },
    });
  }
}
