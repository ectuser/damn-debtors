import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { DatabaseDebt } from './models/databaseDebt';
import { Debt } from './models/debt';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const debts1: DatabaseDebt[] = [
      {
        id: '1',
        name: 'Alex',
        debt: 1000,
        loanDate: '2020-11-04T17:00:00.000Z',
        paymentDate: '2020-11-10T17:00:00.000Z',
      },
      {
        id: '2',
        name: 'Ivan',
        debt: 1500,
        loanDate: '2020-11-04T17:00:00.000Z',
        paymentDate: '2020-11-10T17:00:00.000Z',
      },
      {
        id: '3',
        name: 'John',
        debt: 2000,
        paymentDate: '2020-11-10T17:00:00.000Z',
      },
    ];
    return { debts1 };
  }

  // genId(debts: Debt[]): number {
  //   return debts.length > 0
  //     ? Math.max(...debts.map((debt) => debt.id)) + 1
  //     : 11;
  // }
}
