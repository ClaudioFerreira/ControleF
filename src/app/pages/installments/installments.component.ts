import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CardComponent } from '../../shared/components/card/card.component';
import { InstallmentsService } from '../../shared/services/installments.service';
import { Installment, InstallmentPlan } from '../../shared/models/financial.models';

@Component({
  selector: 'app-installments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent, CardComponent],
  templateUrl: './installments.component.html',
  styleUrl: './installments.component.scss',
})
export class InstallmentsComponent implements OnInit {
  private installmentsService = inject(InstallmentsService);
  private fb = inject(FormBuilder);

  plans: InstallmentPlan[] = [];
  selectedPlan: InstallmentPlan | null = null;
  installments: Installment[] = [];
  isLoading = false;
  showForm = false;
  editingId: string | null = null;

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    totalValue: [0, [Validators.required, Validators.min(0.01)]],
    totalInstallments: [1, [Validators.required, Validators.min(1)]],
    installmentValue: [0, [Validators.required, Validators.min(0.01)]],
    startDate: [new Date().toISOString().split('T')[0], Validators.required],
  });

  ngOnInit() {
    this.loadPlans();
  }

  loadPlans() {
    this.isLoading = true;
    this.installmentsService.getAll().subscribe({
      next: (data) => { this.plans = data; this.isLoading = false; },
      error: () => { this.isLoading = false; },
    });
  }

  selectPlan(plan: InstallmentPlan) {
    this.selectedPlan = plan;
    this.installmentsService.getInstallments(plan.id).subscribe({
      next: (data) => { this.installments = data; },
    });
  }

  openForm(plan?: InstallmentPlan) {
    this.showForm = true;
    if (plan) {
      this.editingId = plan.id;
      this.form.patchValue({ ...plan, startDate: plan.startDate.split('T')[0] });
    } else {
      this.editingId = null;
      this.form.reset({ totalInstallments: 1, totalValue: 0, installmentValue: 0, startDate: new Date().toISOString().split('T')[0] });
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
      this.installmentsService.update(this.editingId, data).subscribe({
        next: () => { this.closeForm(); this.loadPlans(); },
      });
    } else {
      this.installmentsService.create(data).subscribe({
        next: () => { this.closeForm(); this.loadPlans(); },
      });
    }
  }

  delete(id: string) {
    if (!confirm('Deseja remover este plano de parcelas?')) return;
    this.installmentsService.remove(id).subscribe({ next: () => { this.loadPlans(); this.selectedPlan = null; } });
  }

  toggleInstallmentStatus(installment: Installment) {
    if (!this.selectedPlan) return;
    const newStatus = installment.status === 'PAID' ? 'PENDING' : 'PAID';
    this.installmentsService.updateInstallmentStatus(this.selectedPlan.id, installment.id, newStatus).subscribe({
      next: () => this.selectPlan(this.selectedPlan!),
    });
  }

  getProgressPercent(plan: InstallmentPlan): number {
    if (plan.totalInstallments === 0) return 0;
    return Math.round((plan.paidInstallments / plan.totalInstallments) * 100);
  }
}
