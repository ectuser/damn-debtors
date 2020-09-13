import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import {Debtor} from '../models/debtor';

@Component({
  selector: 'app-add-debtor',
  templateUrl: './add-debtor.component.html',
  styleUrls: ['./add-debtor.component.scss']
})
export class AddDebtorComponent implements OnInit {
  addDebtorForm

  constructor(private formBuilder: FormBuilder) { 
    this.addDebtorForm = new FormGroup({
      debt: new FormControl(),
      name: new FormControl(""),
      loanDate: new FormControl(),
      paymentDate: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit(debtorData: Debtor) {
    console.log(debtorData);
  }

}
