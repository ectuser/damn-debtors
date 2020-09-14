import { Component, OnInit } from '@angular/core';
import { DebtorService } from '../debtor.service';
import { DatabaseDebtor } from '../models/databaseDebtor';
import { Debtor } from '../models/debtor';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  constructor(private debtorService: DebtorService) { }

  displayedColumns: string[] = ['name', 'debt', 'loanDate', 'paymentDate'];

  dataSource: Debtor[] = [];

  ngOnInit(): void {
    this.debtorService.getDebtors().subscribe((debtors) => {
      console.log(debtors);
      this.dataSource = debtors.map((debtor: DatabaseDebtor) => ({...debtor, paymentDate: new Date(debtor.paymentDate), loanDate: new Date(debtor.loanDate)}));
    });
  }

}
