# History

Este arquivo registra o que ja foi feito no projeto e o que vem a seguir.
Timezone de referencia: `America/Sao_Paulo` (`-03:00`).

## Padrao de registro

Use este formato em cada nova entrada:


## [YYYY-MM-DD HH:mm -03:00] Titulo curto
Type: feat | fix | chore | docs
Files:
- caminho/do/arquivo.ts
- outro/arquivo.ts
Context:
- resumo objetivo do que foi implementado

- <

---

## [2026-04-13 15:19 -03:00] Bootstrap inicial do backend
Type: chore
Files:
- src/app.module.ts
- src/main.ts
- src/app.controller.ts
- src/app.service.ts
- prisma/schema.prisma
- prisma/migrations/20260316002923_init/migration.sql
Context:
- Estrutura base NestJS criada com Bun e Prisma.
- Modelo inicial `User` definido no banco (`id`, `name`, `email` unico).
- Aplicacao inicial pronta para evolucao por modulos.

## [2026-04-14 13:44 -03:00] Padronizacao de runtime para Bun
Type: chore
Files:
- package.json
- bun.lock
- README.md
Context:
- Scripts e dependencias alinhados para execucao e fluxo de desenvolvimento com Bun.
- Comandos Prisma adicionados nos scripts (`prisma:generate`, `prisma:migrate:dev`, `prisma:migrate:deploy`, `prisma:studio`).

## [2026-04-14 15:27 -03:00] CRUD users + validacao + tratamento de erros
Type: feat
Files:
- src/modules/users/users.module.ts
- src/modules/users/users.controller.ts
- src/modules/users/users.service.ts
- src/modules/users/dto/create-user.dto.ts
- src/modules/users/dto/update-user.dto.ts
- src/modules/users/entities/user.entity.ts
- src/shared/database/prisma.module.ts
- src/shared/database/prisma.service.ts
- src/main.ts
Context:
- CRUD completo de `users` implementado (create, list, detail, update, delete).
- DTOs aplicados com `class-validator` e `PartialType`.
- `ValidationPipe` global configurado com `whitelist`, `forbidNonWhitelisted` e `transform`.
- Tratamento de erro no service com `NotFoundException` (`P2025`) e `ConflictException` (`P2002`).
- Fluxo arquitetural mantido: `Controller -> Service -> PrismaService -> Database`.

## [2026-04-15 09:38 -03:00] Swagger configurado e documentacao do modulo users
Type: feat
Files:
- package.json
- bun.lock
- src/main.ts
- src/modules/users/dto/create-user.dto.ts
- src/modules/users/dto/update-user.dto.ts
- src/modules/users/entities/user.entity.ts
- src/modules/users/users.controller.ts
Context:
- Dependencias `@nestjs/swagger` e `swagger-ui-express` adicionadas ao projeto.
- Swagger configurado no bootstrap com `DocumentBuilder`, `createDocument` e rota `/docs`.
- DTOs e Entity de `users` documentados com `ApiProperty` para exibir schema e exemplos.
- Endpoints de `users` documentados com tags, operacoes, parametros e respostas de sucesso/erro.
- Validacao do fluxo concluida com `bun run lint`, `bun run test` e `bun run build`.

## [2026-04-15 11:18 -03:00] README atualizado com setup real do ambiente
Type: docs
Files:
- README.md
- history.md
Context:
- Template padrao do NestJS removido e substituido por documentacao do projeto.
- Pre-requisitos explicitos adicionados: Bun, PostgreSQL e `DATABASE_URL`.
- Fluxo de instalacao, Prisma, execucao e validacao documentado de forma objetiva.

## [2026-04-21 17:53 -03:00] Autenticacao JWT com login e protecao de rotas
Type: feat
Files:
- package.json
- bun.lock
- prisma/schema.prisma
- prisma/migrations/20260421175304_add_user_password_hash/migration.sql
- src/app.module.ts
- src/main.ts
- src/modules/auth/auth.module.ts
- src/modules/auth/auth.controller.ts
- src/modules/auth/auth.service.ts
- src/modules/auth/dto/login.dto.ts
- src/modules/auth/entities/auth-token.entity.ts
- src/modules/auth/guards/jwt-auth.guard.ts
- src/modules/auth/strategies/jwt.strategy.ts
- src/modules/users/dto/create-user.dto.ts
- src/modules/users/dto/update-user.dto.ts
- src/modules/users/users.controller.ts
- src/modules/users/users.module.ts
- src/modules/users/users.service.ts
- .run/API (Bun Dev).run.xml
- .run/API (Bun Prod).run.xml
Context:
- Autenticacao JWT implementada com `POST /auth/login`, `JwtStrategy` e `JwtAuthGuard`.
- Modelo `User` evoluido com `passwordHash` e migration aplicada para suportar credenciais reais.
- Cadastro de usuario atualizado para receber `password`, gerar hash com `bcryptjs` e nunca expor `passwordHash` nas respostas.
- Rotas de leitura, atualizacao e remocao de `users` protegidas com Bearer token, mantendo `POST /users` publico para cadastro.
- Swagger atualizado com `addBearerAuth()` e ambiente da IDE alinhado para usar `micro_saas` com `schema=public`.

## [2026-04-22 10:52 -03:00] Base inicial de multi-tenant com organization
Type: feat
Files:
- prisma/schema.prisma
- prisma/migrations/20260422105259_add_organization_model/migration.sql
- src/app.module.ts
- src/modules/organizations/organizations.module.ts
- src/modules/organizations/organizations.controller.ts
- src/modules/organizations/organizations.service.ts
- src/modules/organizations/dto/create-organization.dto.ts
- src/modules/organizations/dto/update-organization.dto.ts
- src/modules/organizations/entities/organization.entity.ts
- src/modules/users/entities/user.entity.ts
- src/modules/users/users.service.ts
Context:
- Modelo `Organization` adicionado ao Prisma com `name`, `slug` unico e relacao com `User`.
- `User` passou a expor `organizationId` publico e a manter vinculo opcional com organization para preservar compatibilidade com dados existentes.
- CRUD inicial de `organizations` implementado com DTOs, Swagger e protecao via JWT.
- `OrganizationsModule` registrado no app como base para evoluir o escopo multi-tenant nas proximas fases.

---

## Proximos passos (estado atual)


- <span style="color:#2563eb"><strong>[NEXT]</strong></span> Vincular a organization ao usuario autenticado e aplicar escopo por tenant nas regras de negocio.
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> Permissoes por role e controle de acesso por workspace.
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> Ajustar a execucao dos testes Jest no ambiente Bun/Windows.