import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DebtService } from '../../services/debt/debt.service';
import { Debt, DebtInstance } from '../../models/debt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DebtListService {
  // Debts: BehaviorSubject<DebtInstance[]> = new BehaviorSubject<DebtInstance[]>(
  //   []
  // );
  // Debt: BehaviorSubject<DebtInstance> = new BehaviorSubject<DebtInstance>(null);

  constructor(private debtService: DebtService) {}

  searchDebts(name: string = null) {
    const debts$ = name
      ? this.searchDebtMethod(name)
      : this.getAllDebtsMethod();
    return debts$.pipe(
      map((value: Debt[]) => value.map((debt) => this.debtToDebtInstance(debt)))
    );
  }

  searchDebtMethod(name: string) {
    return this.debtService.findDebtsByName(name);
  }
  getAllDebtsMethod() {
    return this.debtService.getDebts();
  }

  getDebts() {
    const debts$ = this.getAllDebtsMethod();
    return debts$.pipe(
      map((value) => value.map((debt) => this.debtToDebtInstance(debt)))
    );
  }
  getDebtById(id: string) {
    return this.debtService
      .findDebtById(id)
      .pipe(map((value) => this.debtToDebtInstance(value)));
  }

  debtToDebtInstance(debt: Debt) {
    return new DebtInstance({ ...debt });
  }
}
