import { Component, Inject, OnInit } from '@angular/core';
import { DebtorService } from '../debtor.service';
import { DatabaseDebtor } from '../models/databaseDebtor';
import { Debtor } from '../models/debtor';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { DebtorDialogComponent } from '../debtor-dialog/debtor-dialog.component';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  constructor(private debtorService: DebtorService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['name', 'debt', 'loanDate', 'paymentDate'];

  dataSource: Debtor[] = [];

  openDialog(debtor: Debtor){
    const dialogRef = this.dialog.open(DebtorDialogComponent, {
      width: '300px',
      data: {...debtor}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      // this.animal = result;
    });
  }

  ngOnInit(): void {
    this.debtorService.getDebtors().subscribe((debtors) => {
      console.log(debtors);
      this.dataSource = debtors.map((debtor: DatabaseDebtor) => {
        let obj: Debtor = this.debtorService.transformDatabaseDebtorToDebtor(debtor);
        return obj;
      });
    });
  }

}
