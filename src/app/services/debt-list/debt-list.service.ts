import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DebtService } from '../../services/debt/debt.service';
import { DebtInstance } from '../../models/debt';

@Injectable({
  providedIn: 'root',
})
export class DebtListService {
  Debts: BehaviorSubject<DebtInstance[]> = new BehaviorSubject<DebtInstance[]>(
    []
  );

  constructor(private debtService: DebtService) {}

  searchDebts(name: string = null) {
    const debts$ = name
      ? this.searchDebtMethod(name)
      : this.getAllDebtsMethod();
    debts$.subscribe((value: DebtInstance[]) => {
      this.Debts.next(value);
    });
  }

  searchDebtMethod(name: string) {
    return this.debtService.findDebtsByName(name);
  }
  getAllDebtsMethod() {
    return this.debtService.getDebts();
  }
}
