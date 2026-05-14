import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { InvestmentsService } from '../../shared/services/investments.service';
import { Investment, InvestmentType } from '../../shared/models/financial.models';

@Component({
  selector: 'app-investments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, CardComponent],
  templateUrl: './investments.component.html',
  styleUrl: './investments.component.scss',
})
export class InvestmentsComponent implements OnInit {
  private investmentsService = inject(InvestmentsService);
  private fb = inject(FormBuilder);

  investments: Investment[] = [];
  isLoading = false;
  showForm = false;
  editingId: string | null = null;

  types: { value: InvestmentType; label: string }[] = [
    { value: 'STOCKS', label: 'Ações' },
    { value: 'FIXED_INCOME', label: 'Renda Fixa' },
    { value: 'REAL_ESTATE', label: 'Fundos Imobiliários' },
    { value: 'CRYPTO', label: 'Criptomoedas' },
    { value: 'SAVINGS', label: 'Poupança' },
    { value: 'OTHER', label: 'Outros' },
  ];

  typeLabels: Record<InvestmentType, string> = {
    STOCKS: 'Ações', FIXED_INCOME: 'Renda Fixa', REAL_ESTATE: 'Fundos Imobiliários',
    CRYPTO: 'Criptomoedas', SAVINGS: 'Poupança', OTHER: 'Outros',
  };

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    type: ['FIXED_INCOME', Validators.required],
    investedValue: [0, [Validators.required, Validators.min(0.01)]],
    currentValue: [0, [Validators.required, Validators.min(0)]],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    notes: [''],
  });

  get totalInvested(): number {
    return this.investments.reduce((sum, i) => sum + i.investedValue, 0);
  }

  get totalCurrent(): number {
    return this.investments.reduce((sum, i) => sum + i.currentValue, 0);
  }

  get totalGain(): number {
    return this.totalCurrent - this.totalInvested;
  }

  get gainPercent(): number {
    if (this.totalInvested === 0) return 0;
    return (this.totalGain / this.totalInvested) * 100;
  }

  ngOnInit() {
    this.loadInvestments();
  }

  loadInvestments() {
    this.isLoading = true;
    this.investmentsService.getAll().subscribe({
      next: (data) => { this.investments = data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }

  openForm(investment?: Investment) {
    this.showForm = true;
    if (investment) {
      this.editingId = investment.id;
      this.form.patchValue({ ...investment, date: investment.date.split('T')[0] });
    } else {
      this.editingId = null;
      this.form.reset({ type: 'FIXED_INCOME', date: new Date().toISOString().split('T')[0], investedValue: 0, currentValue: 0 });
    }
  }

  closeForm() {
    this.showForm = false;
    this.editingId = null;
    this.form.reset();
  }

  onSubmit() {
    if (this.form.invalid) return;
    const data = this.form.value;
    if (this.editingId) {
      this.investmentsService.update(this.editingId, data).subscribe({
        next: () => { this.closeForm(); this.loadInvestments(); },
      });
    } else {
      this.investmentsService.create(data).subscribe({
        next: () => { this.closeForm(); this.loadInvestments(); },
      });
    }
  }

  delete(id: string) {
    if (!confirm('Deseja remover este investimento?')) return;
    this.investmentsService.remove(id).subscribe({ next: () => this.loadInvestments() });
  }
}
