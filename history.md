# History

Este arquivo registra o que ja foi feito no projeto e o que vem a seguir.
Timezone de referencia: `America/Sao_Paulo` (`-03:00`).

## Padrao de registro

Use este formato em cada nova entrada:

```md
## [YYYY-MM-DD HH:mm -03:00] Titulo curto
Type: feat | fix | chore | docs
Files:
- caminho/do/arquivo.ts
- outro/arquivo.ts
Context:
- resumo objetivo do que foi implementado
Next:
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> proximo passo direto
```

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
Next:
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> consolidar CRUD completo no modulo `users`.

## [2026-04-14 13:44 -03:00] Padronizacao de runtime para Bun
Type: chore
Files:
- package.json
- bun.lock
- README.md
Context:
- Scripts e dependencias alinhados para execucao e fluxo de desenvolvimento com Bun.
- Comandos Prisma adicionados nos scripts (`prisma:generate`, `prisma:migrate:dev`, `prisma:migrate:deploy`, `prisma:studio`).
Next:
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> fortalecer camada de regras de negocio no service.

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
Next:
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> implementar Swagger (documentacao automatica da API).

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
Next:
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> implementar autenticacao JWT (login, guard e protecao de rotas).

## [2026-04-15 11:18 -03:00] README atualizado com setup real do ambiente
Type: docs
Files:
- README.md
- history.md
Context:
- Template padrao do NestJS removido e substituido por documentacao do projeto.
- Pre-requisitos explicitos adicionados: Bun, PostgreSQL e `DATABASE_URL`.
- Fluxo de instalacao, Prisma, execucao e validacao documentado de forma objetiva.
Next:
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> adicionar `.env.example` para reduzir erro de configuracao inicial.

---

## Proximos passos (estado atual)

- <span style="color:#2563eb"><strong>[NEXT]</strong></span> Autenticacao JWT: login, guards e protecao de rotas.
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> Multi-tenant: Organization/Workspace e escopo por tenant.
- <span style="color:#2563eb"><strong>[NEXT]</strong></span> Permissoes por role e controle de acesso por workspace.
