import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debtor } from './models/debtor';
import { DatabaseDebtor } from './models/databaseDebtor';

@Injectable({
  providedIn: 'root'
})
export class DebtorService {

  private debtorsUrl = 'api/debtors';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDebtors(): Observable<DatabaseDebtor[]> {
    let data = this.http.get<DatabaseDebtor[]>(this.debtorsUrl);
    console.log(data);
    return data;
  }

  addDebtor(debtor: Debtor): Observable<DatabaseDebtor>{
    let databaseDebtor: DatabaseDebtor = this.transformDebtorToDatabaseDebtor(debtor);
    return this.http.post<DatabaseDebtor>(this.debtorsUrl, databaseDebtor, this.httpOptions);
  }

  updateDebtor(debtor: Debtor): Observable<any>{
    let databaseDebtor = this.transformDebtorToDatabaseDebtor(debtor);
    console.log(databaseDebtor);
    return this.http.put(this.debtorsUrl, databaseDebtor, this.httpOptions);
  }

  deleteDebtor(debtor: Debtor): Observable<DatabaseDebtor>{
    let databaseDebtor: DatabaseDebtor = this.transformDebtorToDatabaseDebtor(debtor);
    console.log("delete ", databaseDebtor);
    const url = `${this.debtorsUrl}/${databaseDebtor.id}`;
    return this.http.delete<DatabaseDebtor>(url, this.httpOptions);
  }


  public transformDebtorToDatabaseDebtor(debtor: Debtor): DatabaseDebtor{
    let databaseDebtor : DatabaseDebtor = {id: debtor.id, name: debtor.name, debt: debtor.debt};
    databaseDebtor.paymentDate = debtor.paymentDate ? debtor.paymentDate.toDateString() : null;
    databaseDebtor.loanDate = debtor.loanDate ? debtor.loanDate.toDateString() : null;
    return databaseDebtor;
  }

  public transformDatabaseDebtorToDebtor(databaseDebtor: DatabaseDebtor): Debtor{
    let debtor: Debtor = {name: databaseDebtor.name, debt: databaseDebtor.debt, id: databaseDebtor.id};
    debtor.loanDate = databaseDebtor.loanDate ? new Date(databaseDebtor.loanDate) : null;
    debtor.paymentDate = databaseDebtor.paymentDate ? new Date(databaseDebtor.paymentDate) : null;
    return debtor;
  }
    
}
