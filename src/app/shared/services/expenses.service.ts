import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Expense } from '../models/financial.models';

@Injectable({ providedIn: 'root' })
export class ExpensesService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/expenses`;

  getAll(filters?: { month?: number; year?: number; category?: string }): Observable<Expense[]> {
    let params = new HttpParams();
    if (filters?.month) params = params.set('month', filters.month);
    if (filters?.year) params = params.set('year', filters.year);
    if (filters?.category) params = params.set('category', filters.category);
    return this.http.get<Expense[]>(this.baseUrl, { params });
  }

  getById(id: string): Observable<Expense> {
    return this.http.get<Expense>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Expense, 'id' | 'createdAt'>): Observable<Expense> {
    return this.http.post<Expense>(this.baseUrl, data);
  }

  update(id: string, data: Partial<Expense>): Observable<Expense> {
    return this.http.patch<Expense>(`${this.baseUrl}/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
