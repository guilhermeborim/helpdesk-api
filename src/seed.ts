import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const password = await hash("123456", 6);

  const users = [
    { name: "Administrador", email: "admin@gmail.com", role: "ADMIN" },
    { name: "Carlos Técnico", email: "tecnico@gmail.com", role: "TECNICO" },
    { name: "Marina Técnica", email: "tecnico2@gmail.com", role: "TECNICO" },
    { name: "João Cliente", email: "cliente@gmail.com", role: "CLIENTE" },
    { name: "Ana Cliente", email: "cliente2@gmail.com", role: "CLIENTE" },
  ] as const;

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: { ...user, password },
    });
  }

  if ((await prisma.service.count()) === 0) {
    await prisma.service.createMany({
      data: [
        { name: "Instalação de software", price: 80 },
        { name: "Manutenção de computador", price: 150 },
        { name: "Configuração de rede", price: 120 },
        { name: "Recuperação de dados", price: 200 },
      ],
    });
  }

  if ((await prisma.call.count()) === 0) {
    const find = (email: string) =>
      prisma.user.findUniqueOrThrow({ where: { email } });
    const tech1 = await find("tecnico@gmail.com");
    const tech2 = await find("tecnico2@gmail.com");
    const client1 = await find("cliente@gmail.com");
    const client2 = await find("cliente2@gmail.com");
    const services = await prisma.service.findMany({
      orderBy: { name: "asc" },
    });

    const calls = [
      ["Computador não liga", "Sem sinal de energia após queda de luz", "ABERTO"],
      ["Wi-Fi instável", "Conexão cai várias vezes ao dia", "EM_ATENDIMENTO"],
      ["Instalar pacote Office", "Instalação em 3 máquinas novas", "ENCERRADO"],
      ["Perda de arquivos", "HD externo não é reconhecido", "EM_ATENDIMENTO"],
      ["Lentidão no sistema", "Máquina demora para iniciar", "ABERTO"],
      ["Configurar impressora", "Impressora de rede sem comunicação", "ENCERRADO"],
    ] as const;

    for (const [index, [name, description, status]] of calls.entries()) {
      const service = services[index % services.length]!;
      await prisma.call.create({
        data: {
          name,
          description,
          status,
          servicePrice: service.price,
          client: { connect: { id: (index % 2 ? client2 : client1).id } },
          technician: { connect: { id: (index % 2 ? tech2 : tech1).id } },
          service: { connect: { id: service.id } },
        },
      });
    }
  }

  console.log("Seed concluído");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
