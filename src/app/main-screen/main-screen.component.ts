import { Component, Inject, OnInit } from '@angular/core';
import { DebtService } from '../debtor.service';
import { DatabaseDebt } from '../models/databaseDebt';
import { Debt } from '../models/debt';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { DebtorDialogComponent } from '../debtor-dialog/debtor-dialog.component';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  constructor(private debtorService: DebtService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['name', 'debt', 'loanDate', 'paymentDate'];

  dataSource: Debt[] = [];

  openDialog(debtor: Debt){
    const dialogRef = this.dialog.open(DebtorDialogComponent, {
      width: '300px',
      data: {...debtor}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.getDebts();
    });
  }

  ngOnInit(): void {
    this.getDebts();
  }

  getDebts(){
    this.debtorService.getDebts().subscribe((debtors) => {
      console.log(debtors);
      this.dataSource = debtors.map((debtor: DatabaseDebt) => {
        let obj: Debt = this.debtorService.transformDatabaseDebtToDebt(debtor);
        return obj;
      });
    });
  }

}
