import { FocusMonitorDetectionMode } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { DebtService } from '../debt.service';
import { Debt } from '../models/debt';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  formGroup: FormGroup;
  debts: Debt[];
  shownDebts: Debt[];
  constructor(
    private debtorService: DebtService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.search();
    // this.debtorService.getDebts().subscribe((dbDebts) => {
    //   const debts = dbDebts.map((dbDebt) =>
    //     this.debtorService.transformDatabaseDebtToDebt(dbDebt)
    //   );
    //   this.debts = [...debts];
    //   this.shownDebts = [...debts];
    // });

    // this.formGroup.get('control').valueChanges.subscribe((value) => {
    //   if (value.length < 3) {
    //     return;
    //   }
    //   const encodedUserInput = encodeURIComponent(value);
    //   this.debtorService
    //     .findDebtsByName(encodedUserInput)
    //     .subscribe((dbDebts) => {
    //       this.shownDebts = [
    //         ...dbDebts.map((dbDebt) =>
    //           this.debtorService.transformDatabaseDebtToDebt(dbDebt)
    //         ),
    //       ];
    //     });
    // });
  }

  onSubmit(formData) {
    if (!formData || !formData.control) {
      return;
    }
    const encodedUserInput = encodeURIComponent(formData.control);
    console.log(encodedUserInput);
    // this.router.navigate([`search?searchData=${encodedUserInput}`]);
    this.router.navigate(['/search'], {
      queryParams: { searchData: encodedUserInput },
    });
    // this.location.go(`/search?searchData=${encodedUserInput}`);
    // this.search();
    // this.location.replaceState(`/search?searchData=${encodedUserInput}`);
  }

  search() {
    const urlTree = this.router.parseUrl(this.router.url);
    const searchData =
      urlTree.queryParams && urlTree.queryParams.searchData
        ? urlTree.queryParams.searchData
        : '';
    this.formGroup = new FormGroup({
      control: new FormControl(searchData),
    });
    console.log(searchData);
    this.debtorService.findDebtsByName(searchData).subscribe((dbDebts) => {
      this.shownDebts = [
        ...dbDebts.map((dbDebt) =>
          this.debtorService.transformDatabaseDebtToDebt(dbDebt)
        ),
      ];
    });
  }
}
