import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DebtorDialogComponent } from '../debtor-dialog/debtor-dialog.component';
import { CloseDialogStates } from '../debtor-dialog/closeDialogStates';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Debt, DebtInstance } from 'src/app/models/debt';
import { DebtListService } from 'src/app/services/debt-list/debt-list.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss'],
})
export class MainScreenComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private debtListService: DebtListService
  ) {}

  displayedColumns: string[] = ['name', 'debt', 'loanDate', 'paymentDate'];

  dataSource: DebtInstance[] = [];

  openDialog(debt: DebtInstance) {
    const dialogRef = this.dialog.open(DebtorDialogComponent, {
      width: '300px',
      data: { ...debt },
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
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.getDebts();
  }

  getDebts() {
    this.debtListService.getDebts().subscribe(
      (debts) => {
        this.dataSource = debts;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
