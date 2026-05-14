import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardSummary, MonthlyEntry, MonthlySnapshot } from '../models/financial.models';

@Injectable({ providedIn: 'root' })
export class MonthlyControlService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/monthly-control`;

  getSnapshot(month: number, year: number): Observable<MonthlySnapshot> {
    const params = new HttpParams().set('month', month).set('year', year);
    return this.http.get<MonthlySnapshot>(`${this.baseUrl}/snapshot`, { params });
  }

  generateSnapshot(month: number, year: number): Observable<MonthlySnapshot> {
    return this.http.post<MonthlySnapshot>(`${this.baseUrl}/generate`, { month, year });
  }

  updateEntryStatus(snapshotId: string, entryId: string, status: string): Observable<MonthlyEntry> {
    return this.http.patch<MonthlyEntry>(
      `${this.baseUrl}/${snapshotId}/entries/${entryId}`,
      { status }
    );
  }

  updateIncome(snapshotId: string, income: number): Observable<MonthlySnapshot> {
    return this.http.patch<MonthlySnapshot>(`${this.baseUrl}/${snapshotId}`, { income });
  }

  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.baseUrl}/dashboard`);
  }
}
