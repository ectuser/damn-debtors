import { Component, Inject, OnInit } from '@angular/core';
import { DebtService } from '../debt.service';
import { DatabaseDebt } from '../models/databaseDebt';
import { Debt } from '../models/debt';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { DebtorDialogComponent } from '../debtor-dialog/debtor-dialog.component';
import { CloseDialogStates } from '../debtor-dialog/closeDialogStates';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  constructor(
    private debtService: DebtService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private http: HttpClient
  ) {}

  displayedColumns: string[] = ['name', 'debt', 'loanDate', 'paymentDate'];

  dataSource: Debt[] = [];

  openDialog(debtor: Debt) {
    const dialogRef = this.dialog.open(DebtorDialogComponent, {
      width: '300px',
      data: { ...debtor },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      if (
        result === CloseDialogStates.Deleted ||
        result === CloseDialogStates.Updated
      ) {
        console.log(`The debt successfully ${result}`);
        this.openSnackBar(`The debt successfully ${result}`);
      }
      this.getDebts();
    });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, null, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.getDebts();
  }

  getDebts() {
    this.debtService.getDebts().subscribe(
      (debts) => {
        console.log(debts);
        this.dataSource = debts.map((debtor: DatabaseDebt) => {
          let obj: Debt = this.debtService.transformDatabaseDebtToDebt(debtor);
          return obj;
        });
      },
      (err) => console.log(err)
    );
  }
}
