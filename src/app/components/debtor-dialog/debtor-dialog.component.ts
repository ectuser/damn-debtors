import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Debt, DebtInstance } from 'src/app/models/debt';
import { DebtService } from 'src/app/services/debt/debt.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { CloseDialogStates } from './closeDialogStates';

@Component({
  selector: 'app-debtor-dialog',
  templateUrl: './debtor-dialog.component.html',
  styleUrls: ['./debtor-dialog.component.scss'],
})
export class DebtorDialogComponent {
  addDebtForm: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DebtInstance,
    public dialogRef: MatDialogRef<DebtorDialogComponent>,
    private debtorService: DebtService,
    public validationService: ValidationService
  ) {
    this.addDebtForm = new FormGroup({
      debt: new FormControl(data.debt, Validators.required),
      name: new FormControl(data.name, Validators.required),
      loanDate: new FormControl(data.loanDate),
      paymentDate: new FormControl(data.paymentDate),
    });
  }

  onSubmit(formValues): void {
    console.log(formValues);
    const newDebtObject: DebtInstance = new DebtInstance({
      id: this.data.id,
      ...formValues,
    });
    this.debtorService.updateDebt(newDebtObject).subscribe(() => {
      this.dialogRef.close(CloseDialogStates.Updated);
    });
  }

  deleteDebt() {
    const debt: DebtInstance = new DebtInstance({ ...this.data });
    this.debtorService.deleteDebt(debt).subscribe(() => {
      this.dialogRef.close(CloseDialogStates.Deleted);
    });
  }
}
