import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreComponent } from './container/core.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContasRecorrentesComponent } from './pages/contas-recorrentes/contas-recorrentes.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'contas-recorrentes', component: ContasRecorrentesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
