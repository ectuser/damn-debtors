import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebtService } from '../debtor.service';
import { Debt } from '../models/debt';
import { CloseDialogStates } from './closeDialogStates';

@Component({
  selector: 'app-debtor-dialog',
  templateUrl: './debtor-dialog.component.html',
  styleUrls: ['./debtor-dialog.component.scss'],
})
export class DebtorDialogComponent {
  addDebtForm;
  constructor(
    public dialogRef: MatDialogRef<DebtorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Debt,
    private debtorService: DebtService
  ) {
    this.addDebtForm = new FormGroup({
      debt: new FormControl(data.debt),
      name: new FormControl(data.name),
      loanDate: new FormControl(data.loanDate),
      paymentDate: new FormControl(data.paymentDate),
    });
  }

  onSubmit(formValues: Debt): void {
    console.log(formValues);
    let newDebtorObject: Debt = { id: this.data.id, ...formValues };
    this.debtorService.updateDebt(newDebtorObject).subscribe(() => {});
    this.dialogRef.close(CloseDialogStates.Updated);
  }

  deleteDebt() {
    this.debtorService.deleteDebt(this.data).subscribe();
    this.dialogRef.close(CloseDialogStates.Deleted);
  }
}
