# HelpDesk API

API REST de um sistema de **gerenciamento de chamados de suporte**, com três perfis de acesso (Administrador, Técnico e Cliente). É o back-end compartilhado pelas aplicações **Web** (React) e **Mobile** (React Native).

> **Demo online:** [helpdesk-web-sage.vercel.app](https://helpdesk-web-sage.vercel.app/). Na tela de login há botões de acesso de demonstração (Admin, Técnico e Cliente).
> A API roda no plano gratuito do Render e "dorme" após inatividade. O primeiro acesso pode levar cerca de 1 minuto.

![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Fastify](https://img.shields.io/badge/Fastify-5-000000?logo=fastify&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)

## Ecossistema

```text
                  ┌── HelpDesk Web     (React + TypeScript)
                  │
HelpDesk API ─────┤
Fastify + Prisma  │
PostgreSQL        │
                  └── HelpDesk Mobile  (React Native + TypeScript)
```

| Repositório | Descrição |
|---|---|
| [helpdesk-api](https://github.com/guilhermeborim/helpdesk-api) | Esta API |
| [helpdesk-web](https://github.com/guilhermeborim/helpdesk-web) | Aplicação web |
| [helpdesk-app](https://github.com/guilhermeborim/helpdesk-app) | Aplicativo mobile |

## O que o sistema faz

Clientes abrem chamados. Cada chamado é atribuído automaticamente a um técnico, que o conduz até o encerramento. O administrador acompanha tudo e gerencia o catálogo de serviços.

| Perfil | Pode |
|---|---|
| **Cliente** | Abrir chamados e acompanhar os seus |
| **Técnico** | Ver os chamados atribuídos a ele, avançar o status e adicionar serviços adicionais ao chamado |
| **Administrador** | Ver todos os chamados, listar técnicos e clientes, cadastrar e editar serviços |

## Regras de negócio

**Ciclo de vida do chamado**

```text
ABERTO ──► EM_ATENDIMENTO ──► ENCERRADO
```

- O status **só avança**. Voltar ou repetir o mesmo status retorna `409 Conflict`. Um chamado encerrado não é reaberto.
- Apenas o **técnico responsável** pelo chamado altera o status. Outro técnico recebe `403`.
- Clientes e administradores não alteram status (`401`).

**Atribuição automática de técnico**

Ao criar um chamado, o sistema escolhe o técnico responsável:

| Técnicos cadastrados | Resultado |
|---|---|
| 0 | `409` com a mensagem "No momento não temos técnicos disponíveis." Nada é criado. |
| 1 | Ele é o responsável |
| 2 ou mais | Sorteio entre eles |

**Preço do chamado**

O valor do serviço é **copiado para o chamado no momento da criação** (`servicePrice`). Se o preço do serviço mudar depois, os chamados já abertos mantêm o valor original. Serviços adicionais incluídos pelo técnico ficam em `CallService`, com preço próprio.

## Decisões técnicas

**Fastify em vez de Express.** Roteamento rápido, bom suporte a TypeScript e um modelo de hooks (`onRequest`) que encaixa bem em autenticação e controle de perfil.

**Prisma + PostgreSQL.** Tipagem gerada a partir do schema, migrations versionadas e relações explícitas entre usuário, chamado e serviço. O banco relacional combina com os vínculos do domínio.

**Zod nas bordas.** Params e body são validados na entrada de cada controller. Dados inválidos viram `400` com a árvore de erros (`z.treeifyError`). As variáveis de ambiente também são validadas na inicialização, então a API não sobe com configuração incompleta.

**Camadas e inversão de dependência.** Cada regra vive em um *use case* que recebe repositórios por interface. O controller só traduz HTTP, o use case aplica a regra e o repositório fala com o banco. Isso permite testar as regras sem Prisma e trocar a persistência sem tocar nelas.

```text
src/
├── http/
│   ├── controllers/   # rotas, validação Zod, mapeamento erro → status HTTP
│   └── middlewares/   # verifyJWT, verifyUserRole
├── services/          # use cases (regras de negócio) e erros de domínio
│   ├── errors/
│   └── factories/     # montagem das dependências de cada use case
├── repositories/      # interfaces + implementações Prisma
├── env/               # validação das variáveis de ambiente
└── seed.ts            # dados de demonstração
```

**Erros de domínio com status explícito.** Cada falha de regra é uma classe (`CallNotExists`, `CallNotAssigned`, `InvalidStatusTransition`, `NoTechnicianAvailable`) e o controller decide o código HTTP. A regra não conhece HTTP.

**JWT + autorização por perfil.** O token carrega `sub` e `role`. O hook `verifyJWT` autentica e `verifyUserRole("PERFIL")` autoriza por rota. As senhas usam hash com `bcryptjs`.

**CORS configurável.** `CORS_ORIGIN` aceita uma ou mais origens separadas por vírgula (a barra final é ignorada). Sem a variável, libera todas, o que serve ao desenvolvimento local.

**Seed idempotente.** O seed roda a cada deploy. Usuários entram por `upsert` de e-mail. Serviços e chamados só são criados se as tabelas estiverem vazias, então repetir o deploy não duplica nada.

## Endpoints

Todas as rotas, exceto `POST /users` e `POST /sessions`, exigem `Authorization: Bearer <token>`.

| Método | Rota | Perfil | Descrição |
|---|---|---|---|
| POST | `/users` | público | Cadastro de usuário |
| POST | `/sessions` | público | Login, retorna o JWT |
| GET | `/me` | autenticado | Perfil do usuário logado |
| GET | `/clients` | ADMIN | Lista clientes |
| GET | `/tech` | ADMIN | Lista técnicos |
| GET | `/services` | autenticado | Lista serviços |
| POST | `/services` | ADMIN | Cria serviço |
| PATCH | `/services/:id` | ADMIN | Edita serviço |
| POST | `/calls` | CLIENTE | Abre chamado (técnico atribuído automaticamente) |
| GET | `/calls` | autenticado | Lista todos os chamados |
| GET | `/calls/:id` | CLIENTE | Chamados de um cliente |
| GET | `/calls/tech/:id` | TECNICO | Chamados de um técnico |
| PATCH | `/calls/:id/status` | TECNICO | Avança o status (`{ "status": "EM_ATENDIMENTO" }`) |
| POST | `/call_service` | TECNICO | Adiciona serviço adicional a um chamado |

**Códigos de erro principais:** `400` validação, `401` perfil sem permissão, `403` chamado de outro técnico, `404` chamado inexistente, `409` transição inválida ou sem técnicos.

## Modelo de dados

```text
User ──< Call >── Service
 │ (cliente e técnico)   │
 └────────────────────── CallService (serviços adicionais, com preço)
```

- `User`: `role` (`ADMIN | TECNICO | CLIENTE`) e `availability` (horários do técnico).
- `Call`: `status` (`ABERTO | EM_ATENDIMENTO | ENCERRADO`), `servicePrice` e relações com cliente, técnico e serviço.
- `Service`: nome, preço e flag `active`.

## Executando localmente

**Pré-requisitos:** Node.js, Yarn e Docker.

```bash
git clone https://github.com/guilhermeborim/helpdesk-api.git
cd helpdesk-api
yarn install
cp .env.example .env          # ajuste JWT_SECRET e as credenciais do banco
docker compose up -d          # PostgreSQL na porta 5434
yarn prisma migrate deploy    # aplica as migrations
yarn dev                      # http://localhost:3333
```

Para popular o banco com dados de demonstração:

```bash
yarn build && yarn seed
```

**Logins do seed** (senha `123456`): `admin@gmail.com`, `tecnico@gmail.com`, `tecnico2@gmail.com`, `cliente@gmail.com`, `cliente2@gmail.com`.

### Variáveis de ambiente

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | String de conexão do PostgreSQL |
| `JWT_SECRET` | Segredo de assinatura do JWT |
| `NODE_ENV` | `dev`, `test` ou `production` |
| `PORT` | Porta HTTP (padrão `3333`) |
| `CORS_ORIGIN` | Origens permitidas, separadas por vírgula (opcional) |

### Scripts

| Script | O que faz |
|---|---|
| `yarn dev` | Servidor com reload (`tsx watch`) |
| `yarn build` | `prisma generate` + build com `tsup` |
| `yarn start` | Roda o build (`node build/server.js`) |
| `yarn seed` | Popula o banco com dados de demonstração |
| `yarn deploy:build` | `migrate deploy` + build + seed (usado no deploy) |

## Deploy

| Peça | Serviço |
|---|---|
| API | Render (plano gratuito) |
| Banco | PostgreSQL gerenciado (Neon) |
| Web | Vercel |

No Render: **Build** `yarn install --production=false && yarn deploy:build`, **Start** `yarn start`. Variáveis: `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production` e `CORS_ORIGIN` com a URL do front.

## Limitações conhecidas e próximos passos

Este é um projeto de portfólio, e algumas escolhas foram deliberadamente simples:

- **Cadastro público com perfil no body.** `POST /users` aceita `role`, o que serve à demo mas não à produção. O correto é forçar `CLIENTE` no cadastro público e criar técnicos e admins por rota restrita.
- **Logins de demonstração com senha conhecida** no seed, apenas para fins de demo.
- **`GET /calls` não restringe por perfil.** Qualquer usuário autenticado lê a lista completa.
- **Sorteio puro de técnico.** Não considera carga nem `availability`. Uma evolução natural é balancear pelo número de chamados abertos.
- **Sem testes automatizados.** A arquitetura em use cases com repositórios por interface foi pensada para receber testes unitários com repositórios em memória.
- **Sem refresh token.** O JWT dura 7 dias.

## Autor

**Guilherme Borim**

- [LinkedIn](https://www.linkedin.com/in/guilhermeborim)
- [GitHub](https://github.com/guilhermeborim)
