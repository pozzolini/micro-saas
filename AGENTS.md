# AGENTS

Este arquivo define contexto, objetivos e regras para agentes (Codex/AI) neste projeto.

---

## 🎯 Objetivo do projeto

Este projeto é um **backend de micro-SaaS para portfólio**, com foco em demonstrar:

- Arquitetura profissional de backend
- Boas práticas com NestJS
- Integração real com banco de dados
- Organização escalável de código
- Padrões usados em empresas

O objetivo final é evoluir este backend para um sistema SaaS real com:

- Autenticação (JWT)
- Multi-tenant (Organization / Workspace)
- Relacionamentos entre entidades
- API documentada (Swagger)
- Estrutura pronta para produção

---

## 🧱 Stack principal

- Runtime: **Bun**
- Backend: **NestJS 11**
- Linguagem: **TypeScript**
- ORM: **Prisma 7**
- Banco: **PostgreSQL**
- Validação: **class-validator + class-transformer**

---

## 📁 Estrutura do projeto

```plaintext
src/
│
├ modules/
│ └ <feature>/
│ ├ dto/
│ ├ entities/
│ ├ <feature>.controller.ts
│ ├ <feature>.service.ts
│ └ <feature>.module.ts
│
├ shared/
│ └ database/
│ ├ prisma.service.ts
│ └ prisma.module.ts
│
├ app.module.ts
└ main.ts

prisma/
├ schema.prisma
└ migrations/
```

---

## 🧠 Arquitetura (obrigatória)

Sempre seguir o fluxo:

Controller → Service → Prisma → Database


Regras:

- Controller:
  - Apenas recebe requisição e retorna resposta
  - Nunca conter regra de negócio

- Service:
  - Contém toda a lógica da aplicação
  - Responsável por comunicação com o Prisma

- PrismaService:
  - Único ponto de acesso ao banco
  - Nunca acessar banco direto fora dele

---

## 📦 Padrões obrigatórios

### DTOs

- `Create<Entidade>Dto`
- `Update<Entidade>Dto` (usando PartialType)

Local:

src/modules/<modulo>/dto


---

### Entities

- Representam modelo de domínio da aplicação

Local:

src/modules/<modulo>/entities


---

### Nomeação

- Código sempre em inglês
- Nomes descritivos e claros
- Evitar abreviações

---

## ⚠️ REGRA CRÍTICA PARA AGENTES (MUITO IMPORTANTE)

❌ O agente **NUNCA deve modificar arquivos diretamente**

❌ NÃO aplicar patches automaticamente  
❌ NÃO reescrever arquivos completos sem solicitação explícita

✅ O agente DEVE:

- Indicar exatamente **qual arquivo alterar**
- Mostrar **antes/depois**
- Explicar o que está sendo feito
- Dar instruções passo a passo

Exemplo esperado:

Arquivo: src/modules/users/users.service.ts

Altere de:
...

Para:
...



---

## 🧪 Qualidade e validação

Antes de qualquer mudança relevante:

Rodar:

bun run lint
bun run test
bun run build



---

## 🗄️ Banco de dados (Prisma)

- Alterações sempre via:

prisma/schema.prisma


Depois:

bunx prisma generate
bunx prisma migrate dev



---

## 🔐 Variáveis de ambiente

Nunca versionar:

.env*

Usar:

DATABASE_URL


---

## 🚫 Git / arquivos proibidos

Nunca versionar:

node_modules/
dist/
coverage/
.env*
.junie/



---

## 🚀 Evolução planejada (roadmap técnico)

O projeto deve evoluir seguindo esta ordem:

1. CRUD completo (já feito)
2. DTO correto (Create / Update)
3. Tratamento de erros (NotFoundException, ConflictException)
4. Swagger (documentação automática)
5. Autenticação (JWT)
6. Organização / Workspace (multi-tenant)
7. Permissões / roles
8. Integração com frontend (React)

---

## 🧩 Observações importantes

- Código deve ser didático (projeto de aprendizado + portfólio)
- Preferir clareza sobre complexidade
- Evitar "mágica" desnecessária
- Sempre explicar decisões arquiteturais

---

## 🧠 Filosofia do projeto

Este projeto NÃO é apenas funcional.

Ele deve demonstrar:

- organização
- clareza
- boas práticas
- pensamento de engenharia

---

## 📌 Regra final

Se houver dúvida:

👉 priorizar simplicidade  
👉 priorizar legibilidade  
👉 priorizar boas práticas de mercado  