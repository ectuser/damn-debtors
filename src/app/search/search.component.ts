import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DebtService } from '../debt.service';
import { Debt } from '../models/debt';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseDebt } from '../models/databaseDebt';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  shownDebts: Debt[];

  private unsubscribe = new Subject();

  constructor(
    private debtorService: DebtService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      control: new FormControl(),
    });

    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(({ searchData }) => {
        // fire search if any data
        console.log(searchData);
        this.search(searchData);
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmit(formData) {
    if (!formData || !formData.control) {
      return;
    }
    const encodedUserInput = encodeURIComponent(formData.control);
    this.router.navigate(['/search'], {
      queryParams: { searchData: encodedUserInput },
    });
  }

  search(name?: string) {
    if (!name) {
      return this.getAllDebts();
    }
    const decoedName = decodeURIComponent(name);
    this.formGroup.patchValue({ control: decoedName });
    console.log(decoedName);
    this.debtorService.findDebtsByName(decoedName).subscribe((dbDebts) => {
      this.getDbDebts(dbDebts);
    });
  }
  getAllDebts() {
    this.debtorService.getDebts().subscribe((dbDebts) => {
      this.getDbDebts(dbDebts);
    });
  }

  getDbDebts(dbDebts: DatabaseDebt[]) {
    this.shownDebts = [
      ...dbDebts.map((dbDebt) =>
        this.debtorService.transformDatabaseDebtToDebt(dbDebt)
      ),
    ];
  }
}
