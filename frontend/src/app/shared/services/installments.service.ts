import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Installment, InstallmentPlan } from '../models/financial.models';

@Injectable({ providedIn: 'root' })
export class InstallmentsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/installments`;

  getAll(): Observable<InstallmentPlan[]> {
    return this.http.get<InstallmentPlan[]>(this.baseUrl);
  }

  getById(id: string): Observable<InstallmentPlan> {
    return this.http.get<InstallmentPlan>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<InstallmentPlan, 'id' | 'paidInstallments' | 'isActive' | 'createdAt' | 'updatedAt' | 'installments'>): Observable<InstallmentPlan> {
    return this.http.post<InstallmentPlan>(this.baseUrl, data);
  }

  update(id: string, data: Partial<InstallmentPlan>): Observable<InstallmentPlan> {
    return this.http.patch<InstallmentPlan>(`${this.baseUrl}/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getInstallments(planId: string): Observable<Installment[]> {
    return this.http.get<Installment[]>(`${this.baseUrl}/${planId}/installments`);
  }

  updateInstallmentStatus(planId: string, installmentId: string, status: string): Observable<Installment> {
    return this.http.patch<Installment>(
      `${this.baseUrl}/${planId}/installments/${installmentId}`,
      { status }
    );
  }
}
