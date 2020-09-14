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
    let databaseDebtor : DatabaseDebtor = {id: Date.now(), name: debtor.name, debt: debtor.debt};
    databaseDebtor.paymentDate = debtor.paymentDate ? debtor.paymentDate.toDateString() : null;
    databaseDebtor.loanDate = debtor.loanDate ? debtor.loanDate.toDateString() : null;
    // console.log("Add debtor", databaseDebtor);
    return this.http.post<DatabaseDebtor>(this.debtorsUrl, databaseDebtor, this.httpOptions);
  }
    
}
