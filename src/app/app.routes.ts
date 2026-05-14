import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'contas-recorrentes',
    loadComponent: () =>
      import('./pages/accounts/accounts.component').then((m) => m.AccountsComponent),
  },
  {
    path: 'parceladas',
    loadComponent: () =>
      import('./pages/installments/installments.component').then((m) => m.InstallmentsComponent),
  },
  {
    path: 'gastos',
    loadComponent: () =>
      import('./pages/expenses/expenses.component').then((m) => m.ExpensesComponent),
  },
  {
    path: 'investimentos',
    loadComponent: () =>
      import('./pages/investments/investments.component').then((m) => m.InvestmentsComponent),
  },
  {
    path: 'controle-mensal',
    loadComponent: () =>
      import('./pages/monthly-control/monthly-control.component').then(
        (m) => m.MonthlyControlComponent,
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
