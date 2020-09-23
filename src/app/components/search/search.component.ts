import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Debt } from 'src/app/models/debt';
import { DebtListService } from 'src/app/services/debt-list/debt-list.service';

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
    private router: Router,
    private route: ActivatedRoute,
    private debtListService: DebtListService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      control: new FormControl(),
    });

    this.route.queryParams
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(({ searchData }) => {
        console.log(searchData);
        this.debtListService.searchDebts(searchData);
        if (searchData) {
          this.formGroup.patchValue({
            control: decodeURIComponent(searchData),
          });
        }
      });

    this.debtListService.Debts.subscribe((value) => {
      this.shownDebts = value;
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
}
