import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private apiUrl = 'http://localhost:5000/api/budget';

  constructor(private http: HttpClient) {}

  getBudget(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }
  addBudget(budgetData: any) {
    return this.http.post('http://localhost:5000/api/budget', budgetData, {
      withCredentials: true // <-- important!
    });
  }
}