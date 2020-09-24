import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Debt } from 'src/app/models/debt';
import { DebtService } from 'src/app/services/debt/debt.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss'],
})
export class DebtComponent implements OnInit {
  private id: string;
  debt: Debt;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private debtorsService: DebtService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.debtorsService.findDebtById(this.id).subscribe(
      (debtDB) => {
        let debt = this.debtorsService.transformDatabaseDebtToDebt(debtDB);
        this.debt = debt;
      },
      (err) => {
        this._snackBar.open(err, null, {
          duration: 2000,
        });
        this.router.navigate(['/debts']);
      }
    );
  }
}
