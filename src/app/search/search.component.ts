import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../models/debtor';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  formGroup = new FormGroup({
    control: new FormControl()
  });
  debts: Observable<Debtor[]>;
  shownDebts: Observable<Debtor[]>;
  data
  constructor(private debtorService: DebtorService) { }

  ngOnInit(): void {
    this.debts = this.debtorService.getDebtors().pipe(
      map(dbDebts => dbDebts.map(dbDebt => this.debtorService.transformDatabaseDebtorToDebtor(dbDebt)))
    );
    // this.debtorService.getDebtors().subscribe((dbDebts) => {
    //   const debts = dbDebts.map(dbDebt => this.debtorService.transformDatabaseDebtorToDebtor(dbDebt));
    //   this.debts = [...debts];
    // });

    // this.shownDebts = this.formGroup.get('control').valueChanges.pipe(
    //   map(value => this._filter(value))
    // );
  }

  private _filter(value: string): Debtor[] {
    const filterValue = value.toLowerCase();
    return this.debts.filter(debt => debt.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
