import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DebtorService } from '../debtor.service';
import { DatabaseDebtor } from '../models/databaseDebtor';
import {Debtor} from '../models/debtor';

@Component({
  selector: 'app-add-debtor',
  templateUrl: './add-debtor.component.html',
  styleUrls: ['./add-debtor.component.scss']
})
export class AddDebtorComponent implements OnInit {
  addDebtorForm

  constructor(private formBuilder: FormBuilder, private debtorService: DebtorService) { 
    this.addDebtorForm = new FormGroup({
      debt: new FormControl(),
      name: new FormControl(""),
      loanDate: new FormControl(),
      paymentDate: new FormControl()
    })
  }

  ngOnInit(): void {
  }

  onSubmit(debtorData) {
    let debtorObj = {...debtorData, id: Date.now()};
    console.log(debtorObj);
    this.debtorService.addDebtor(debtorObj).subscribe((debtor: DatabaseDebtor) => {
      // console.log(debtor);
    });
  }

}
