import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DebtService } from '../debt.service';
import { DatabaseDebt } from '../models/databaseDebt';
import { Debt } from '../models/debt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-debtor',
  templateUrl: './add-debtor.component.html',
  styleUrls: ['./add-debtor.component.scss'],
})
export class AddDebtComponent implements OnInit {
  addDebtForm;

  constructor(
    private formBuilder: FormBuilder,
    private debtorService: DebtService,
    private router: Router
  ) {
    this.addDebtForm = this.formBuilder.group({
      debt: ['', Validators.required],
      name: ['', Validators.required],
      loanDate: new FormControl(),
      paymentDate: new FormControl(),
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
