import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import endpoints from './endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getDashoardData(): Observable<any> {
    return this.http.get(endpoints.dashboardData);
  }
}
