import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Debt, DebtInstance } from '../../models/debt';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DebtService {
  private debtsUrl = 'api/debts';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getDebts(): Observable<DebtInstance[]> {
    const data = this.http.get<Debt[]>(this.debtsUrl, this.httpOptions);
    return data.pipe(
      map((debts) => debts.map((debt) => new DebtInstance({ ...debt }))),
      catchError(() => {
        return throwError("Can't find debts");
      })
    );
  }

  addDebt(debt: DebtInstance): Observable<Debt> {
    console.log(debt);

    return this.http.post<Debt>(this.debtsUrl, debt, this.httpOptions);
  }

  updateDebt(debt: DebtInstance): Observable<any> {
    const dbDebt = debt.toJSON();
    const url = `${this.debtsUrl}/${dbDebt.id}`;
    return this.http.put(url, dbDebt, this.httpOptions);
  }

  deleteDebt(debt: DebtInstance): Observable<Debt> {
    const databaseDebt: Debt = debt.toJSON();
    const url = `${this.debtsUrl}/${databaseDebt.id}`;
    return this.http.delete<Debt>(url, this.httpOptions);
  }

  findDebtById(id: string): Observable<DebtInstance> {
    const url = `${this.debtsUrl}/${id}`;
    return this.http.get<Debt>(url).pipe(
      map((debt) => new DebtInstance({ ...debt })),
      catchError(() => throwError("Can't find debt"))
    );
  }

  findDebtsByName(name: string): Observable<DebtInstance[]> {
    const requestUrl = `api/search?searchData=${name}`;
    return this.http
      .get<Debt[]>(requestUrl)
      .pipe(map((debts) => debts.map((debt) => new DebtInstance({ ...debt }))));
  }
}
