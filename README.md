# ControleF

Sistema de controle financeiro pessoal para homelab.

## Estrutura

```
ControleF/
├── frontend/   # Angular 17 — interface do usuário (porta 4200)
├── backend/    # NestJS + Prisma 5 + PostgreSQL (porta 3000)
└── docs/       # Documentação do projeto
```

## Quick start

```bash
# 1. PostgreSQL via Docker
docker run --name controlef-db \
  -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=controlef \
  -p 5432:5432 -d postgres

# 2. Backend
cd backend && cp .env.example .env && npm install
npm run prisma:push && npm run start:dev

# 3. Frontend (outro terminal)
cd frontend && npm install && npm start
```

- **Frontend**: http://localhost:4200
- **API / Swagger**: http://localhost:3000/api

## Documentação completa

Consulte a pasta [`docs/`](./docs/README.md):

- [Visão Geral](./docs/overview.md)
- [Arquitetura](./docs/architecture.md)
- [API Reference](./docs/api.md)
- [Setup detalhado](./docs/setup.md)
- [Banco de Dados](./docs/database.md)


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
