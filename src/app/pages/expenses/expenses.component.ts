import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { ExpensesService } from '../../shared/services/expenses.service';
import { Expense, ExpenseCategory } from '../../shared/models/financial.models';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SidebarComponent, CardComponent],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent implements OnInit {
  private expensesService = inject(ExpensesService);
  private fb = inject(FormBuilder);

  expenses: Expense[] = [];
  isLoading = false;
  showForm = false;
  editingId: string | null = null;

  // Filtros de mês/ano
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

  categories: { value: ExpenseCategory; label: string }[] = [
    { value: 'FOOD', label: 'Alimentação' },
    { value: 'TRANSPORT', label: 'Transporte' },
    { value: 'HEALTH', label: 'Saúde' },
    { value: 'LEISURE', label: 'Lazer' },
    { value: 'CLOTHING', label: 'Vestuário' },
    { value: 'EDUCATION', label: 'Educação' },
    { value: 'OTHER', label: 'Outros' },
  ];

  categoryLabels: Record<ExpenseCategory, string> = {
    FOOD: 'Alimentação', TRANSPORT: 'Transporte', HEALTH: 'Saúde',
    LEISURE: 'Lazer', CLOTHING: 'Vestuário', EDUCATION: 'Educação', OTHER: 'Outros',
  };

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    value: [0, [Validators.required, Validators.min(0.01)]],
    date: [new Date().toISOString().split('T')[0], Validators.required],
    category: ['OTHER', Validators.required],
    notes: [''],
  });

  get totalAmount(): number {
    return this.expenses.reduce((sum, e) => sum + e.value, 0);
  }

  ngOnInit() {
    this.loadExpenses();
  }

  loadExpenses() {
    this.isLoading = true;
    this.expensesService.getAll({ month: this.selectedMonth, year: this.selectedYear }).subscribe({
      next: (data) => { this.expenses = data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }

  openForm(expense?: Expense) {
    this.showForm = true;
    if (expense) {
      this.editingId = expense.id;
      this.form.patchValue({ ...expense, date: expense.date.split('T')[0] });
    } else {
      this.editingId = null;
      this.form.reset({ category: 'OTHER', date: new Date().toISOString().split('T')[0], value: 0 });
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
      this.expensesService.update(this.editingId, data).subscribe({
        next: () => { this.closeForm(); this.loadExpenses(); },
      });
    } else {
      this.expensesService.create(data).subscribe({
        next: () => { this.closeForm(); this.loadExpenses(); },
      });
    }
  }

  delete(id: string) {
    if (!confirm('Deseja remover este gasto?')) return;
    this.expensesService.remove(id).subscribe({ next: () => this.loadExpenses() });
  }

  onFilterChange() {
    this.loadExpenses();
  }
}
