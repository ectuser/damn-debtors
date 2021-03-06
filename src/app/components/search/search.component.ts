import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtInstance } from 'src/app/models/debt';
import { DebtListService } from 'src/app/services/debt-list/debt-list.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  shownDebts: DebtInstance[];

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
        if (searchData) {
          this.formGroup.patchValue({
            control: decodeURIComponent(searchData),
          });
        }
        this.debtListService.searchDebts(searchData).subscribe(
          (debts) => {
            this.shownDebts = debts;
          },
          (err) => {
            console.log('Something went wrong', err);
          }
        );
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
