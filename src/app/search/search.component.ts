import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { DebtService } from '../debt.service';
import { Debt } from '../models/debt';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  formGroup = new FormGroup({
    control: new FormControl(),
  });
  debts: Debt[];
  shownDebts: Debt[];
  constructor(private debtorService: DebtService) {}

  ngOnInit(): void {
    this.debtorService.getDebts().subscribe((dbDebts) => {
      const debts = dbDebts.map((dbDebt) =>
        this.debtorService.transformDatabaseDebtToDebt(dbDebt)
      );
      this.debts = [...debts];
      this.shownDebts = [...debts];
    });

    this.formGroup.get('control').valueChanges.subscribe((value) => {
      if (value.length < 3) {
        return;
      }
      const encodedUserInput = encodeURIComponent(value);
      this.debtorService
        .findDebtsByName(encodedUserInput)
        .subscribe((dbDebts) => {
          this.shownDebts = [
            ...dbDebts.map((dbDebt) =>
              this.debtorService.transformDatabaseDebtToDebt(dbDebt)
            ),
          ];
        });
    });
  }
}
