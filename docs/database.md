# Banco de Dados

ORM: **Prisma 5** | Banco: **PostgreSQL**

---

## Diagrama de entidades

```
RecurringAccount          InstallmentPlan
─────────────────         ──────────────────────
id (PK)                   id (PK)
name                      name
category (enum)           totalValue
averageValue              totalInstallments
dueDay                    installmentValue
isActive                  startDate
createdAt                 paidInstallments
updatedAt                 isActive
    │                     createdAt
    │                     updatedAt
    │                          │
    │                          │ 1:N
    │                          ▼
    │                     Installment
    │                     ──────────────────────
    │                     id (PK)
    │                     planId (FK)
    │                     installmentNumber
    │                     value
    │                     dueDate
    │                     status (enum)
    │                     paidAt
    │
    │ (referência opcional via MonthlyEntry)
    ▼
MonthlySnapshot
──────────────────────
id (PK)
month
year           ◄── unique(month, year)
totalBills
totalPaid
totalPending
totalExpenses
income
notes
createdAt
updatedAt
    │
    │ 1:N
    ▼
MonthlyEntry
──────────────────────
id (PK)
snapshotId (FK)
referenceType (enum)   ← RECURRING | INSTALLMENT
recurringAccountId (FK, opcional)
installmentId (FK, opcional)
name
value
dueDate
status (enum)
paidAt


Expense                   Investment
──────────────────────    ──────────────────────
id (PK)                   id (PK)
name                      name
value                     type (enum)
date                      investedValue
category (enum)           currentValue
notes                     date
createdAt                 notes
                          createdAt
                          updatedAt
```

---

## Enums

```prisma
enum PaymentStatus {
  PENDING   # aguardando pagamento
  PAID      # pago
  OVERDUE   # atrasado
}

enum AccountCategory {
  WATER | ENERGY | INTERNET | RENT | PHONE | HEALTH | EDUCATION | OTHER
}

enum ExpenseCategory {
  FOOD | TRANSPORT | HEALTH | LEISURE | CLOTHING | EDUCATION | OTHER
}

enum InvestmentType {
  STOCKS | FIXED_INCOME | REAL_ESTATE | CRYPTO | SAVINGS | OTHER
}

enum MonthlyEntryType {
  RECURRING     # originado de uma RecurringAccount
  INSTALLMENT   # originado de uma Installment
}
```

---

## Decisões de modelagem

### Por que `MonthlySnapshot` + `MonthlyEntry`?
Em vez de calcular dinamicamente a cada requisição, o snapshot **congela** os dados do mês. Isso permite:
- Alterar o status de pagamento sem afetar as entidades originais
- Ter histórico mesmo que uma conta seja removida
- Calcular totais uma única vez na geração do snapshot

### Por que `recurringAccountId` e `installmentId` são opcionais em `MonthlyEntry`?
Uma entrada pode originar de uma conta recorrente **ou** de uma parcela. Apenas um dos campos será preenchido. Isso evita criar duas tabelas separadas (uma para cada tipo).

### Por que `Installment` tem relação com `MonthlyEntry`?
Para que ao gerar o snapshot, parcelas já pagas reflitam seu status correto automaticamente.

---

## Comandos úteis

```bash
# Ver o banco de dados visualmente
cd backend && npm run prisma:studio

# Criar migration após mudança no schema
npm run prisma:migrate

# Resetar o banco (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Ver SQL gerado pelo schema
npx prisma migrate dev --create-only
```
