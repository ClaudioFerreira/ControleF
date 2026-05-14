import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../shared/components/card/card.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { MonthlyControlService } from '../../shared/services/monthly-control.service';
import { DashboardSummary } from '../../shared/models/financial.models';
import { RotasEnum } from '../../shared/enums/rotas.enum';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent, CardComponent, CurrencyPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private monthlyService = inject(MonthlyControlService);

  summary: DashboardSummary | null = null;
  isLoading = true;
  rotas = RotasEnum;

  get compromissoPercent(): number {
    if (!this.summary?.currentMonth.income || this.summary.currentMonth.income === 0) return 0;
    return Math.min(
      100,
      Math.round((this.summary.currentMonth.totalBills / this.summary.currentMonth.income) * 100),
    );
  }

  ngOnInit() {
    this.monthlyService.getDashboardSummary().subscribe({
      next: (data) => { this.summary = data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }
}
