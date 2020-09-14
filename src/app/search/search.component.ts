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
  debts: Debtor[] = [];
  shownDebts: Debtor[] = [];
  filteredOptions: Observable<Debtor[]>;
  constructor(private debtorService: DebtorService) { }

  ngOnInit(): void {
    this.debtorService.getDebtors().subscribe((dbDebts) => {
      const debts = dbDebts.map(dbDebt => this.debtorService.transformDatabaseDebtorToDebtor(dbDebt));
      this.debts = [...debts];
      this.shownDebts = [...debts];
    });
    this.formGroup.get('control').valueChanges.subscribe(word => {
      const filterValue = word.toLowerCase();
      this.shownDebts = this.debts.filter(debt => debt.name.toLowerCase().indexOf(filterValue) === 0);
    });
    // this.filteredOptions = this.formGroup.get('control').valueChanges.pipe(
    //   startWith(''),
    //   map(value => {
    //     let values = this._filter(value)
    //     console.log(values);
    //     return values;
    //   })
    // );
  }

  private _filter(value: string): Debtor[] {
    const filterValue = value.toLowerCase();
    return this.debts.filter(debt => debt.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
