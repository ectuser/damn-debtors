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
      {_id: 1, name: "Alex", debt: 1000, loanDate: "2020-11-04T17:00:00.000Z", paymentDate: "2020-11-10T17:00:00.000Z"},
      {_id: 2, name: "Ivan", debt: 1500, loanDate: "2020-11-04T17:00:00.000Z", paymentDate: "2020-11-10T17:00:00.000Z"},
      {_id: 3, name: "John", debt: 2000, loanDate: "2020-11-04T17:00:00.000Z", paymentDate: "2020-11-10T17:00:00.000Z"},
      {_id: 4, name: "Alfred", debt: 30000, loanDate: "2020-11-04T17:00:00.000Z", paymentDate: "2020-11-10T17:00:00.000Z"}
    ];
    return {debtors};
  }

  // genId(heroes: Hero[]): number {
  //   return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  // }
}