# Setup e Instalação

## Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- [Docker](https://www.docker.com) (recomendado para o PostgreSQL)
- Git

---

## 1. Clonar o repositório

```bash
git clone https://github.com/ClaudioFerreira/ControleF.git
cd ControleF
```

---

## 2. Banco de dados (PostgreSQL)

### Opção A — Docker (recomendado)
```bash
docker run --name controlef-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=controlef \
  -p 5432:5432 \
  -d postgres
```

### Opção B — PostgreSQL local
Crie o banco `controlef` manualmente:
```sql
CREATE DATABASE controlef;
```

---

## 3. Backend

```bash
cd backend

# Copiar e configurar variáveis de ambiente
cp .env.example .env
# Edite DATABASE_URL se necessário (padrão: postgres/postgres@localhost:5432/controlef)

# Instalar dependências
npm install

# Gerar o Prisma Client
npm run prisma:generate

# Criar as tabelas no banco
npm run prisma:push       # rápido para desenvolvimento
# ou
npm run prisma:migrate    # cria histórico de migrations (recomendado para produção)

# Iniciar em modo desenvolvimento (hot-reload)
npm run start:dev
```

O backend estará disponível em:
- **API**: http://localhost:3000
- **Swagger**: http://localhost:3000/api

---

## 4. Frontend

```bash
# Em outro terminal, a partir da raiz do projeto
cd frontend

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm start
```

O frontend estará disponível em: **http://localhost:4200**

---

## 5. Verificar se está funcionando

1. Acesse http://localhost:4200 — deve aparecer o Dashboard
2. Acesse http://localhost:3000/api — deve aparecer o Swagger UI
3. No Swagger, teste `GET /accounts` — deve retornar `[]`

---

## Scripts disponíveis

### Backend (`backend/`)

| Script | Descrição |
|---|---|
| `npm run start:dev` | Desenvolvimento com hot-reload |
| `npm run build` | Compilar para produção |
| `npm run start:prod` | Rodar build de produção |
| `npm run prisma:generate` | Gerar Prisma Client após mudanças no schema |
| `npm run prisma:push` | Sincronizar schema → banco (sem migration) |
| `npm run prisma:migrate` | Criar e aplicar migration |
| `npm run prisma:studio` | Abrir Prisma Studio (UI para o banco) |

### Frontend (`frontend/`)

| Script | Descrição |
|---|---|
| `npm start` | Servidor de desenvolvimento (porta 4200) |
| `npm run build` | Build de produção |
| `npm run watch` | Build em modo watch |

---

## Variáveis de ambiente

### `backend/.env`

| Variável | Padrão | Descrição |
|---|---|---|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/controlef` | String de conexão PostgreSQL |
| `PORT` | `3000` | Porta da API |
| `NODE_ENV` | `development` | Ambiente |

### `frontend/src/environments/environment.ts`

| Variável | Padrão | Descrição |
|---|---|---|
| `apiUrl` | `http://localhost:3000` | URL base da API |

---

## Integração com n8n

Para registrar gastos via automação (Telegram, WhatsApp etc.):

**Webhook no n8n → HTTP Request node:**
```
Method: POST
URL: http://SEU_IP:3000/expenses
Body (JSON):
{
  "name": "{{ $json.text }}",
  "value": 50.00,
  "date": "{{ $now.toISO() }}",
  "category": "OTHER"
}
```

Para obter resumo financeiro:
```
Method: GET
URL: http://SEU_IP:3000/monthly-control/dashboard
```

---

## Produção (homelab)

Para rodar de forma permanente, use PM2:

```bash
# Backend
cd backend
npm run build
npx pm2 start dist/main.js --name "controlef-api"

# Frontend (servir o build estático com nginx ou serve)
cd frontend
npm run build
npx serve dist/controle-f -p 4200
```
