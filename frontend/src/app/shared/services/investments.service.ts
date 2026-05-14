import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Investment } from '../models/financial.models';

@Injectable({ providedIn: 'root' })
export class InvestmentsService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/investments`;

  getAll(): Observable<Investment[]> {
    return this.http.get<Investment[]>(this.baseUrl);
  }

  getById(id: string): Observable<Investment> {
    return this.http.get<Investment>(`${this.baseUrl}/${id}`);
  }

  create(data: Omit<Investment, 'id' | 'createdAt' | 'updatedAt'>): Observable<Investment> {
    return this.http.post<Investment>(this.baseUrl, data);
  }

  update(id: string, data: Partial<Investment>): Observable<Investment> {
    return this.http.patch<Investment>(`${this.baseUrl}/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
