# Arquitetura

## Diagrama Geral

```
┌─────────────────────────────────────────────────────────────┐
│                        Homelab                              │
│                                                             │
│   ┌──────────────────┐        ┌─────────────────────────┐   │
│   │   Angular 17     │  HTTP  │      NestJS API          │   │
│   │   (frontend/)    │◄──────►│      (backend/)          │   │
│   │   :4200          │        │      :3000               │   │
│   └──────────────────┘        └────────────┬────────────┘   │
│                                            │  Prisma 5       │
│                                            ▼                 │
│                                   ┌────────────────┐        │
│                                   │  PostgreSQL     │        │
│                                   │  :5432          │        │
│                                   └────────────────┘        │
│                                                             │
│   ┌──────────────────┐                                      │
│   │      n8n         │──► POST /expenses                    │
│   │  (automações)    │──► GET  /monthly-control/dashboard   │
│   └──────────────────┘                                      │
└─────────────────────────────────────────────────────────────┘
```

## Frontend (Angular 17)

### Estrutura de diretórios
```
frontend/src/app/
├── pages/
│   ├── auth/                 # Tela de login
│   ├── home/                 # Dashboard
│   ├── accounts/             # Contas recorrentes
│   ├── installments/         # Parcelamentos
│   ├── expenses/             # Gastos esporádicos
│   ├── investments/          # Investimentos
│   └── monthly-control/      # Controle mensal
└── shared/
    ├── components/
    │   ├── sidebar/          # Navegação lateral
    │   └── card/             # Componente de card reutilizável
    ├── services/             # HttpClient para consumo da API
    ├── models/               # Interfaces TypeScript
    └── enums/                # Rotas e enums
```

### Decisões de design
- **Standalone Components**: sem NgModules, mais leve e moderno
- **Lazy Loading**: cada página carregada sob demanda (`loadComponent`)
- **Reactive Forms**: validação robusta em todos os formulários
- **Design System próprio**: sem Angular Material, CSS custom organizado em `styles/`

---

## Backend (NestJS)

### Estrutura de módulos
```
backend/src/
├── prisma/               # PrismaService (@Global) — injetado em qualquer módulo
├── accounts/             # Contas recorrentes
├── installments/         # Planos e parcelas
├── expenses/             # Gastos esporádicos
├── investments/          # Investimentos
└── monthly-control/      # Controle mensal + dashboard
```

Cada módulo contém:
```
modulo/
├── modulo.module.ts
├── modulo.controller.ts   # Rotas HTTP + Swagger
├── modulo.service.ts      # Regras de negócio
└── dto/
    ├── create-*.dto.ts    # Validação de entrada (POST)
    └── update-*.dto.ts    # Validação de entrada (PATCH)
```

### Fluxo de requisição
```
HTTP Request
    │
    ▼
Controller  ←── Swagger decorators
    │
    ▼
ValidationPipe (class-validator — automático via GlobalPipe)
    │
    ▼
Service  ←── Regras de negócio
    │
    ▼
PrismaService  ←── SQL gerado automaticamente
    │
    ▼
PostgreSQL
```

### Decisões técnicas

| Decisão | Motivo |
|---|---|
| Prisma sobre TypeORM | Melhor DX, tipos gerados automaticamente, migrations mais simples |
| `@Global()` no PrismaModule | Evitar re-importação do módulo em todos os lugares |
| `whitelist: true` no ValidationPipe | Remove campos não declarados nos DTOs automaticamente |
| `transform: true` no ValidationPipe | Converte strings de query params para número automaticamente |
| CORS `origin: '*'` | Homelab — sem necessidade de restrição de origem |

---

## Banco de Dados

Ver [database.md](./database.md) para o schema completo e relações.
