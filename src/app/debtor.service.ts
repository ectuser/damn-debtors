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

  constructor(private http: HttpClient) { }

  getDebtors(): Observable<DatabaseDebtor[]> {
    let data = this.http.get<DatabaseDebtor[]>(this.debtorsUrl);
    console.log(data);
    return data;
  }
    
}
