import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../models/debtor';

@Component({
  selector: 'app-debtor-dialog',
  templateUrl: './debtor-dialog.component.html',
  styleUrls: ['./debtor-dialog.component.scss']
})
export class DebtorDialogComponent {
  addDebtorForm
  constructor(
    public dialogRef: MatDialogRef<DebtorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Debtor, 
    private debtorService: DebtorService) {
      this.addDebtorForm = new FormGroup({
        debt: new FormControl(data.debt),
        name: new FormControl(data.name),
        loanDate: new FormControl(data.loanDate),
        paymentDate: new FormControl(data.paymentDate)
      })
    }

  onSubmit(formValues: Debtor): void {
    console.log(formValues);
    let newDebtorObject: Debtor = {id: this.data.id ,...formValues};
    // console.log(newDebtorObject);
    // this.data.name = formValues.name;
    // this.data.debt = formValues.debt;
    // this.data.loanDate = formValues.loanDate;
    // this.data.paymentDate = formValues.paymentDate;
    this.debtorService.updateDebtor(newDebtorObject).subscribe(() => {
      
    });
    this.dialogRef.close();
  }

  deleteDebtor(){
    this.debtorService.deleteDebtor(this.data).subscribe();
  }
}
