import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DatabaseDebtor } from './models/databaseDebtor';
import { Debtor } from './models/debtor';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const debtors: DatabaseDebtor[] = [
      {id: 1, name: "Alex", debt: 1000, loanDate: "2020-11-04T17:00:00.000Z", paymentDate: "2020-11-10T17:00:00.000Z"},
      {id: 2, name: "Ivan", debt: 1500, loanDate: "2020-11-04T17:00:00.000Z", paymentDate: "2020-11-10T17:00:00.000Z"},
      {id: 3, name: "John", debt: 2000, paymentDate: "2020-11-10T17:00:00.000Z"},
      {id: 4, name: "Alfred", debt: 30000, loanDate: "2020-11-04T17:00:00.000Z"}
    ];
    return {debtors};
  }

  genId(debtors: Debtor[]): number {
    return debtors.length > 0 ? Math.max(...debtors.map(debtor => debtor.id)) + 1 : 11;
  }
}