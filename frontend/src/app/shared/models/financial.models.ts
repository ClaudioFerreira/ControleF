// Enums espelhando o backend Prisma
export type PaymentStatus = 'PENDING' | 'PAID' | 'OVERDUE';
export type AccountCategory =
  | 'WATER'
  | 'ENERGY'
  | 'INTERNET'
  | 'RENT'
  | 'PHONE'
  | 'HEALTH'
  | 'EDUCATION'
  | 'OTHER';
export type ExpenseCategory =
  | 'FOOD'
  | 'TRANSPORT'
  | 'HEALTH'
  | 'LEISURE'
  | 'CLOTHING'
  | 'EDUCATION'
  | 'OTHER';
export type InvestmentType =
  | 'STOCKS'
  | 'FIXED_INCOME'
  | 'REAL_ESTATE'
  | 'CRYPTO'
  | 'SAVINGS'
  | 'OTHER';

export interface RecurringAccount {
  id: string;
  name: string;
  category: AccountCategory;
  averageValue: number;
  dueDay: number; // dia do mês (1-31)
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InstallmentPlan {
  id: string;
  name: string;
  totalValue: number;
  totalInstallments: number;
  installmentValue: number;
  startDate: string;
  paidInstallments: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  installments?: Installment[];
}

export interface Installment {
  id: string;
  planId: string;
  installmentNumber: number;
  value: number;
  dueDate: string;
  status: PaymentStatus;
  paidAt?: string;
  plan?: InstallmentPlan;
}

export interface Expense {
  id: string;
  name: string;
  value: number;
  date: string;
  category: ExpenseCategory;
  notes?: string;
  createdAt: string;
}

export interface Investment {
  id: string;
  name: string;
  type: InvestmentType;
  investedValue: number;
  currentValue: number;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MonthlySnapshot {
  id: string;
  month: number; // 1-12
  year: number;
  totalBills: number;
  totalPaid: number;
  totalPending: number;
  totalExpenses: number;
  income?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  entries?: MonthlyEntry[];
}

export interface MonthlyEntry {
  id: string;
  snapshotId: string;
  referenceId: string; // id da conta ou parcela
  referenceType: 'RECURRING' | 'INSTALLMENT';
  name: string;
  value: number;
  dueDate: string;
  status: PaymentStatus;
  paidAt?: string;
}

// Tipos de resposta paginada da API
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Resumo do dashboard
export interface DashboardSummary {
  currentMonth: {
    totalBills: number;
    totalPaid: number;
    totalPending: number;
    totalExpenses: number;
    income?: number;
  };
  investments: {
    totalInvested: number;
    totalCurrent: number;
    gain: number;
  };
  monthlyEvolution: Array<{
    month: string;
    total: number;
    paid: number;
  }>;
  expensesByCategory: Array<{
    category: string;
    total: number;
  }>;
}
