import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DebtService } from './debt.service';
import { DatabaseDebt } from './models/databaseDebt';
import { Debt } from './models/debt';

@Injectable({
  providedIn: 'root',
})
export class DebtListService {
  Debts: BehaviorSubject<Debt[]> = new BehaviorSubject<Debt[]>([]);

  constructor(private debtService: DebtService) {}

  searchDebts(name: string = null) {
    const debts$ = name
      ? this.searchDebtMethod(name)
      : this.getAllDebtsMethod();
    debts$
      .pipe(
        map((dbDebts) =>
          dbDebts.map((dbDebt) => this.transformDatabaseDebtToDebt(dbDebt))
        )
      )
      .subscribe((value: Debt[]) => {
        this.Debts.next(value);
      });
  }

  searchDebtMethod(name: string) {
    return this.debtService.findDebtsByName(name);
  }
  getAllDebtsMethod() {
    return this.debtService.getDebts();
  }

  transformDebtToDatabaseDebt(debt: Debt): DatabaseDebt {
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

  transformDatabaseDebtToDebt(databaseDebt: DatabaseDebt): Debt {
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
