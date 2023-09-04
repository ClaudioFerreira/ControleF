import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreComponent } from './container/core.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContasRecorrentesComponent } from './pages/contas-recorrentes/contas-recorrentes.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CoreComponent, DashboardComponent, ContasRecorrentesComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
})
export class CoredModule {}
