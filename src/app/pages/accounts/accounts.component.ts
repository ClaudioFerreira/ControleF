import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { AccountsService } from '../../shared/services/accounts.service';
import { RecurringAccount, AccountCategory } from '../../shared/models/financial.models';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, CardComponent],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss',
})
export class AccountsComponent implements OnInit {
  private accountsService = inject(AccountsService);
  private fb = inject(FormBuilder);

  accounts: RecurringAccount[] = [];
  isLoading = false;
  showForm = false;
  editingId: string | null = null;

  categories: { value: AccountCategory; label: string }[] = [
    { value: 'WATER', label: 'Água' },
    { value: 'ENERGY', label: 'Energia' },
    { value: 'INTERNET', label: 'Internet' },
    { value: 'RENT', label: 'Aluguel' },
    { value: 'PHONE', label: 'Telefone' },
    { value: 'HEALTH', label: 'Saúde' },
    { value: 'EDUCATION', label: 'Educação' },
    { value: 'OTHER', label: 'Outros' },
  ];

  categoryLabels: Record<AccountCategory, string> = {
    WATER: 'Água', ENERGY: 'Energia', INTERNET: 'Internet',
    RENT: 'Aluguel', PHONE: 'Telefone', HEALTH: 'Saúde',
    EDUCATION: 'Educação', OTHER: 'Outros',
  };

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    category: ['OTHER', Validators.required],
    averageValue: [0, [Validators.required, Validators.min(0.01)]],
    dueDay: [1, [Validators.required, Validators.min(1), Validators.max(31)]],
    isActive: [true],
  });

  ngOnInit() {
    this.loadAccounts();
  }

  loadAccounts() {
    this.isLoading = true;
    this.accountsService.getAll().subscribe({
      next: (data) => { this.accounts = data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }

  openForm(account?: RecurringAccount) {
    this.showForm = true;
    if (account) {
      this.editingId = account.id;
      this.form.patchValue(account);
    } else {
      this.editingId = null;
      this.form.reset({ category: 'OTHER', dueDay: 1, isActive: true, averageValue: 0 });
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
      this.accountsService.update(this.editingId, data).subscribe({
        next: () => { this.closeForm(); this.loadAccounts(); },
      });
    } else {
      this.accountsService.create(data).subscribe({
        next: () => { this.closeForm(); this.loadAccounts(); },
      });
    }
  }

  delete(id: string) {
    if (!confirm('Deseja remover esta conta?')) return;
    this.accountsService.remove(id).subscribe({ next: () => this.loadAccounts() });
  }
}
