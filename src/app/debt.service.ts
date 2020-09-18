import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Debt } from './models/debt';
import { DatabaseDebt } from './models/databaseDebt';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

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

  getDebts(): Observable<DatabaseDebt[]> {
    const data = this.http.get<DatabaseDebt[]>(this.debtsUrl, this.httpOptions);
    console.log(data);
    return data.pipe(
      catchError(() => {
        return throwError("Can't find debts");
      })
    );
  }

  addDebt(debt: Debt): Observable<DatabaseDebt> {
    let databaseDebtor: DatabaseDebt = this.transformDebtToDatabaseDebt(debt);
    return this.http.post<DatabaseDebt>(
      this.debtsUrl,
      databaseDebtor,
      this.httpOptions
    );
  }

  updateDebt(debt: Debt): Observable<any> {
    let databaseDebt = this.transformDebtToDatabaseDebt(debt);
    console.log(databaseDebt);
    const url = `${this.debtsUrl}/${databaseDebt.id}`;
    return this.http.put(url, databaseDebt, this.httpOptions);
  }

  deleteDebt(debt: Debt): Observable<DatabaseDebt> {
    let databaseDebt: DatabaseDebt = this.transformDebtToDatabaseDebt(debt);
    console.log('delete ', databaseDebt);
    const url = `${this.debtsUrl}/${databaseDebt.id}`;
    return this.http.delete<DatabaseDebt>(url, this.httpOptions);
  }

  findDebtById(id: string): Observable<DatabaseDebt> {
    const url = `${this.debtsUrl}/${id}`;
    return this.http
      .get<DatabaseDebt>(url)
      .pipe(catchError(() => throwError("Can't find debt")));
  }

  findDebtsByName(searchString: string): Observable<DatabaseDebt[]> {
    const url = `api/search?searchData=${searchString}`;
    return this.http.get<DatabaseDebt[]>(url);
  }

  public transformDebtToDatabaseDebt(debt: Debt): DatabaseDebt {
    let databaseDebtor: DatabaseDebt = {
      id: debt.id,
      name: debt.name,
      debt: debt.debt,
    };
    databaseDebtor.paymentDate = debt.paymentDate
      ? debt.paymentDate.toDateString()
      : null;
    databaseDebtor.loanDate = debt.loanDate
      ? debt.loanDate.toDateString()
      : null;
    return databaseDebtor;
  }

  public transformDatabaseDebtToDebt(databaseDebt: DatabaseDebt): Debt {
    let debt: Debt = {
      name: databaseDebt.name,
      debt: databaseDebt.debt,
      id: databaseDebt.id,
    };
    debt.loanDate = databaseDebt.loanDate
      ? new Date(databaseDebt.loanDate)
      : null;
    debt.paymentDate = databaseDebt.paymentDate
      ? new Date(databaseDebt.paymentDate)
      : null;
    return debt;
  }
}
