# API Reference

Base URL: `http://localhost:3000`

Swagger UI interativo: `http://localhost:3000/api`

---

## Contas Recorrentes — `/accounts`

### `GET /accounts`
Lista todas as contas recorrentes, ordenadas por dia de vencimento.

**Resposta**
```json
[
  {
    "id": "uuid",
    "name": "Conta de Energia",
    "category": "ENERGY",
    "averageValue": "150.00",
    "dueDay": 10,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### `POST /accounts`
Cria uma conta recorrente.

**Body**
```json
{
  "name": "Conta de Energia",
  "category": "ENERGY",
  "averageValue": 150.00,
  "dueDay": 10,
  "isActive": true
}
```

**Categorias disponíveis:** `WATER` | `ENERGY` | `INTERNET` | `RENT` | `PHONE` | `HEALTH` | `EDUCATION` | `OTHER`

### `PATCH /accounts/:id`
Atualiza parcialmente uma conta recorrente.

### `DELETE /accounts/:id`
Remove uma conta recorrente.

---

## Parcelamentos — `/installments`

### `GET /installments`
Lista todos os planos de parcelamento com contagem de parcelas.

### `POST /installments`
Cria um plano e **gera automaticamente todas as parcelas** com datas de vencimento mensais.

**Body**
```json
{
  "name": "iPhone 15",
  "totalValue": 6000.00,
  "totalInstallments": 12,
  "installmentValue": 500.00,
  "startDate": "2024-01-15"
}
```

### `GET /installments/:id`
Retorna o plano com todas as suas parcelas.

### `GET /installments/:id/installments`
Lista apenas as parcelas de um plano.

### `PATCH /installments/:id/installments/:installmentId`
Marca uma parcela como paga ou pendente. Atualiza automaticamente o contador `paidInstallments` do plano.

**Body**
```json
{ "status": "PAID" }
```

**Status disponíveis:** `PENDING` | `PAID` | `OVERDUE`

---

## Gastos Esporádicos — `/expenses`

> ✅ **n8n-ready**: este endpoint pode ser chamado por webhook do n8n para registrar gastos via Telegram/WhatsApp.

### `GET /expenses`
Lista gastos com filtros opcionais.

**Query params**
| Param | Tipo | Exemplo |
|---|---|---|
| `month` | number | `3` |
| `year` | number | `2024` |
| `category` | string | `FOOD` |

### `POST /expenses`
Cria um gasto esporádico.

**Body**
```json
{
  "name": "Supermercado Extra",
  "value": 320.50,
  "date": "2024-03-15",
  "category": "FOOD",
  "notes": "Compra mensal"
}
```

**Categorias:** `FOOD` | `TRANSPORT` | `HEALTH` | `LEISURE` | `CLOTHING` | `EDUCATION` | `OTHER`

---

## Investimentos — `/investments`

### `GET /investments`
Lista todos os investimentos.

### `GET /investments/summary`
Retorna resumo consolidado da carteira.

**Resposta**
```json
{
  "totalInvested": 25000.00,
  "totalCurrent": 27340.50,
  "gain": 2340.50,
  "gainPercent": 9.36,
  "count": 5
}
```

### `POST /investments`
Cadastra um investimento.

**Body**
```json
{
  "name": "Tesouro Selic 2027",
  "type": "FIXED_INCOME",
  "investedValue": 5000.00,
  "currentValue": 5320.00,
  "date": "2024-01-10",
  "notes": "Vencimento em 2027"
}
```

**Tipos:** `STOCKS` | `FIXED_INCOME` | `REAL_ESTATE` | `CRYPTO` | `SAVINGS` | `OTHER`

### `PATCH /investments/:id`
Atualiza um investimento (ex: atualizar `currentValue` manualmente).

---

## Controle Mensal — `/monthly-control`

### `GET /monthly-control/dashboard`
> ✅ **n8n-ready**: retorna resumo financeiro completo do mês atual.

**Resposta**
```json
{
  "currentMonth": {
    "totalBills": 3200.00,
    "totalPaid": 1800.00,
    "totalPending": 1400.00,
    "totalExpenses": 850.00,
    "income": 8500.00
  },
  "investments": {
    "totalInvested": 25000.00,
    "totalCurrent": 27340.50,
    "gain": 2340.50
  },
  "monthlyEvolution": [
    { "month": "10/2023", "total": 3100.00, "paid": 3100.00 },
    { "month": "11/2023", "total": 3250.00, "paid": 2800.00 }
  ],
  "expensesByCategory": [
    { "category": "FOOD", "total": 620.00 },
    { "category": "TRANSPORT", "total": 230.00 }
  ]
}
```

### `GET /monthly-control/snapshot?month=3&year=2024`
Retorna o snapshot de um mês específico com todas as entradas.

### `POST /monthly-control/generate`
Gera (ou regenera) o snapshot de um mês, coletando automaticamente todas as contas recorrentes ativas e parcelas com vencimento naquele mês.

**Body**
```json
{ "month": 3, "year": 2024 }
```

### `PATCH /monthly-control/:snapshotId`
Atualiza dados do snapshot (ex: registrar renda do mês).

**Body**
```json
{ "income": 8500.00, "notes": "Mês com bônus" }
```

### `PATCH /monthly-control/:snapshotId/entries/:entryId`
Marca uma entrada do mês como paga ou pendente. Recalcula automaticamente `totalPaid` e `totalPending` do snapshot.

**Body**
```json
{ "status": "PAID" }
```

---

## Códigos de resposta

| Código | Significado |
|---|---|
| `200` | Sucesso |
| `201` | Criado |
| `400` | Dados inválidos (falha na validação do DTO) |
| `404` | Recurso não encontrado |
| `500` | Erro interno do servidor |
