# HelpDesk API

API REST do sistema **HelpDesk**, responsável por centralizar os dados e regras utilizadas pelas aplicações Web e Mobile.

A mesma API é consumida pela aplicação desenvolvida em **React** e pelo aplicativo desenvolvido em **React Native**.

## Tecnologias

- Node.js
- TypeScript
- Fastify
- PostgreSQL
- Prisma ORM
- Docker
- Docker Compose

## Responsabilidades

- Gerenciamento de usuários
- Gerenciamento de chamados
- Controle dos diferentes perfis de usuário
- Persistência de dados com PostgreSQL
- Comunicação com as aplicações Web e Mobile

## Arquitetura do sistema

```text
                  ┌── HelpDesk Web
                  │   React + TypeScript
                  │
HelpDesk API ─────┤
Node.js + Fastify │
PostgreSQL        │
                  │
                  └── HelpDesk Mobile
                      React Native + TypeScript
```

A API funciona como o Back-end compartilhado do sistema, permitindo que as aplicações Web e Mobile utilizem os mesmos dados e regras.

## Ecossistema HelpDesk

- **Web:** React + TypeScript
- **Mobile:** React Native + TypeScript
- **API:** Node.js + Fastify + TypeScript + PostgreSQL + Prisma

## Repositórios

- [HelpDesk Web](https://github.com/guilhermeborim/helpdesk-web)
- [HelpDesk API](https://github.com/guilhermeborim/helpdesk-api)
- [HelpDesk Mobile](https://github.com/guilhermeborim/helpdesk-app)

## Pré-requisitos

- Node.js
- Docker
- Docker Compose
- Git

## Executando o projeto

Clone o repositório:

```bash
git clone https://github.com/guilhermeborim/helpdesk-api.git
cd helpdesk-api
```

Instale as dependências:

```bash
npm install
```

Suba os serviços:

```bash
docker compose up -d
```

Execute a API:

```bash
npm run dev
```

## Autor

**Guilherme Borim**

- [LinkedIn](https://www.linkedin.com/in/guilhermeborim)
- [GitHub](https://github.com/guilhermeborim)
