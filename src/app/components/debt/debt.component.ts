import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtInstance } from 'src/app/models/debt';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DebtListService } from 'src/app/services/debt-list/debt-list.service';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss'],
})
export class DebtComponent implements OnInit {
  private id: string;
  debt: DebtInstance;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private debtListService: DebtListService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.debtListService.getDebtById(this.id).subscribe(
      (debt) => {
        this.debt = debt;
      },
      (err) => {
        this.snackBar.open(err, null, {
          duration: 2000,
        });
        this.router.navigate(['/debts']);
      }
    );
  }
}
