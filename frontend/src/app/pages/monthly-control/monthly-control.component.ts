import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { MonthlyControlService } from '../../shared/services/monthly-control.service';
import { MonthlyEntry, MonthlySnapshot, PaymentStatus } from '../../shared/models/financial.models';

@Component({
  selector: 'app-monthly-control',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent, CardComponent],
  templateUrl: './monthly-control.component.html',
  styleUrl: './monthly-control.component.scss',
})
export class MonthlyControlComponent implements OnInit {
  private monthlyService = inject(MonthlyControlService);

  snapshot: MonthlySnapshot | null = null;
  isLoading = false;
  selectedMonth = new Date().getMonth() + 1;
  selectedYear = new Date().getFullYear();

  months = [
    { value: 1, label: 'Janeiro' }, { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' }, { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' }, { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' }, { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' }, { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' }, { value: 12, label: 'Dezembro' },
  ];

  years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - 2 + i);

  get paidEntries(): MonthlyEntry[] {
    return this.snapshot?.entries?.filter(e => e.status === 'PAID') ?? [];
  }

  get pendingEntries(): MonthlyEntry[] {
    return this.snapshot?.entries?.filter(e => e.status === 'PENDING' || e.status === 'OVERDUE') ?? [];
  }

  get progressPercent(): number {
    if (!this.snapshot || this.snapshot.totalBills === 0) return 0;
    return Math.round((this.snapshot.totalPaid / this.snapshot.totalBills) * 100);
  }

  ngOnInit() {
    this.loadSnapshot();
  }

  loadSnapshot() {
    this.isLoading = true;
    this.monthlyService.getSnapshot(this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => { this.snapshot = data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }

  generateSnapshot() {
    this.isLoading = true;
    this.monthlyService.generateSnapshot(this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => { this.snapshot = data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }

  toggleEntryStatus(entry: MonthlyEntry) {
    if (!this.snapshot) return;
    const newStatus: PaymentStatus = entry.status === 'PAID' ? 'PENDING' : 'PAID';
    this.monthlyService.updateEntryStatus(this.snapshot.id, entry.id, newStatus).subscribe({
      next: () => this.loadSnapshot(),
    });
  }

  onMonthYearChange() {
    this.loadSnapshot();
  }

  previousMonth() {
    if (this.selectedMonth === 1) { this.selectedMonth = 12; this.selectedYear--; }
    else this.selectedMonth--;
    this.loadSnapshot();
  }

  nextMonth() {
    if (this.selectedMonth === 12) { this.selectedMonth = 1; this.selectedYear++; }
    else this.selectedMonth++;
    this.loadSnapshot();
  }
}
