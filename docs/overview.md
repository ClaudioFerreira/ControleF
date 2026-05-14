# Visão Geral

## O que é o ControleF?

Sistema fullstack de controle financeiro pessoal desenvolvido para uso em homelab (acesso privado local). Permite gerenciar toda a vida financeira em um único lugar: contas fixas, parcelamentos, gastos avulsos, investimentos e um controle mensal consolidado.

## Funcionalidades

### 💧 Contas Recorrentes
Contas fixas mensais (água, energia, internet, aluguel etc.).
- Cadastro com categoria, valor médio e dia de vencimento
- Geradas automaticamente no controle mensal

### 💳 Parcelamentos
Compras parceladas (cartão de crédito, financiamentos etc.).
- Cadastro do plano com valor total e número de parcelas
- Parcelas individuais geradas automaticamente com datas de vencimento
- Acompanhamento de parcelas pagas vs. pendentes

### 💸 Gastos Esporádicos
Despesas avulsas e imprevistos.
- Registro manual com categoria, data e observação
- Filtros por mês/ano e categoria
- Endpoint disponível para integração com n8n (ex: via Telegram)

### 📈 Investimentos
Carteira de investimentos pessoal.
- Suporte a ações, renda fixa, FIIs, cripto, poupança
- Resumo com total investido, valor atual e rendimento

### 📅 Controle Mensal
Painel centralizado por mês.
- Geração automática a partir das contas recorrentes e parcelas do mês
- Marcar contas como pagas ou pendentes
- Resumo: total do mês, pago, pendente e progresso

### 📊 Dashboard
Visão geral da saúde financeira.
- Resumo do mês atual
- Gráfico de evolução mensal (últimos 6 meses)
- Gastos por categoria

## Integrações (n8n-ready)

Os endpoints abaixo foram projetados para integração com automações via n8n, Telegram, WhatsApp etc.:

| Endpoint | Uso |
|---|---|
| `POST /expenses` | Registrar gasto por mensagem |
| `GET /monthly-control/dashboard` | Obter resumo financeiro do mês |

## Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Angular 17, standalone components, reactive forms |
| Backend | NestJS, arquitetura modular |
| ORM | Prisma 5 |
| Banco | PostgreSQL |
| API | REST + Swagger |
