# Micro-SaaS Backend

Backend de portfólio construído com NestJS, Bun, Prisma e PostgreSQL, com foco em organização, boas práticas e evolução para um SaaS real.

## Stack

- Bun `>= 1.3.11`
- NestJS `11`
- TypeScript
- Prisma `7`
- PostgreSQL

## Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- `Bun` para instalar dependências e executar os scripts do projeto
- `PostgreSQL` porque o datasource do Prisma usa `provider = "postgresql"`
- Uma variável de ambiente `DATABASE_URL` apontando para um banco PostgreSQL válido

Exemplo de `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/micro_saas?schema=public"
```

Se o PostgreSQL não estiver rodando, os comandos do Prisma e a aplicação vão falhar na conexão com o banco.

## Instalação

### 1. Instalar dependências do projeto

```bash
bun install
```

### 2. Configurar ambiente

Crie um arquivo `.env` na raiz do projeto com a variável:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/micro_saas?schema=public"
```

### 3. Preparar o banco

Crie o banco no PostgreSQL com o nome que você definiu na `DATABASE_URL`.

Exemplo:

```sql
CREATE DATABASE micro_saas;
```

### 4. Gerar o client do Prisma

```bash
bun run prisma:generate
```

### 5. Criar e aplicar migrations em desenvolvimento

```bash
bun run prisma:migrate:dev
```

## Executando o projeto

```bash
# desenvolvimento
bun run start:dev

# build
bun run build

# produção
bun run start:prod
```

## Scripts úteis

```bash
# lint
bun run lint

# testes unitários
bun run test

# testes e2e
bun run test:e2e

# coverage
bun run test:cov

# Prisma Studio
bun run prisma:studio
```

## Fluxo recomendado após clonar

```bash
bun install
bun run prisma:generate
bun run prisma:migrate:dev
bun run start:dev
```

## Validação antes de mudanças relevantes

```bash
bun run lint
bun run test
bun run build
```

## Estrutura

```plaintext
src/
├ modules/
│ └ <feature>/
│   ├ dto/
│   ├ entities/
│   ├ <feature>.controller.ts
│   ├ <feature>.service.ts
│   └ <feature>.module.ts
├ shared/
│ └ database/
│   ├ prisma.module.ts
│   └ prisma.service.ts
├ app.module.ts
└ main.ts
```

## Arquitetura

O fluxo obrigatório do projeto é:

`Controller -> Service -> PrismaService -> Database`

Regras principais:

- `Controller`: recebe a requisição e devolve a resposta
- `Service`: concentra a lógica de negócio
- `PrismaService`: ponto único de acesso ao banco

## Próximos passos

- Autenticação com JWT
- Multi-tenant com Organization/Workspace
- Permissões por role
- Integração com frontend
