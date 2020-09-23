import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Debt } from 'src/app/models/debt';
import { DebtService } from 'src/app/services/debt/debt.service';

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
    private debtorsService: DebtService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.debtorsService.findDebtById(this.id).subscribe(
      (debtDB) => {
        let debt = this.debtorsService.transformDatabaseDebtToDebt(debtDB);
        this.debt = debt;
        console.log(debt);
      },
      (err) => {
        console.log('Wrong path');
        this.router.navigate(['/debtors']);
      }
    );
  }
}
