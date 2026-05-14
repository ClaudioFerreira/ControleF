import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RecurringAccount } from '../models/financial.models';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/accounts`;

  getAll(): Observable<RecurringAccount[]> {
    return this.http.get<RecurringAccount[]>(this.baseUrl);
  }

  getById(id: string): Observable<RecurringAccount> {
    return this.http.get<RecurringAccount>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<RecurringAccount, 'id' | 'createdAt' | 'updatedAt'>): Observable<RecurringAccount> {
    return this.http.post<RecurringAccount>(this.baseUrl, data);
  }

  update(id: string, data: Partial<RecurringAccount>): Observable<RecurringAccount> {
    return this.http.patch<RecurringAccount>(`${this.baseUrl}/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
