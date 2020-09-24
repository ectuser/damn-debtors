import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseDebt } from 'src/app/models/databaseDebt';
import { DebtService } from 'src/app/services/debt/debt.service';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { ValidationErrorTypes } from 'src/app/validation-error-types';

@Component({
  selector: 'app-add-debtor',
  templateUrl: './add-debtor.component.html',
  styleUrls: ['./add-debtor.component.scss'],
})
export class AddDebtComponent implements OnInit {
  addDebtForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private debtorService: DebtService,
    private router: Router,
    public validationService: ValidationService
  ) {
    this.addDebtForm = this.formBuilder.group({
      debt: ['', Validators.required],
      name: ['', Validators.required],
      loanDate: [''],
      paymentDate: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(debtData) {
    let debtObj = { ...debtData };
    console.log(debtObj);
    this.debtorService.addDebt(debtObj).subscribe((debt: DatabaseDebt) => {
      this.router.navigate(['/debts']);
    });
  }
}
