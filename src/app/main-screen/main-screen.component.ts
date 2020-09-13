import { Component, OnInit } from '@angular/core';
import { Debtor } from '../models/debtor';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['name', 'debt', 'loanDate', 'paymentDate'];

  dataSource: Debtor[] = [
    {name: "Alex", debt: 1000, loanDate: new Date("11.05.2020"), paymentDate: new Date("11.11.2020")},
    {name: "Ivan", debt: 1500, loanDate: new Date("11.05.2020"), paymentDate: new Date("11.11.2020")},
    {name: "John", debt: 2000, loanDate: new Date("11.05.2020"), paymentDate: new Date("11.11.2020")},
    {name: "Alfred", debt: 30000, loanDate: new Date("11.05.2020"), paymentDate: new Date("11.11.2020")}
  ];

  ngOnInit(): void {
    console.log(this.dataSource);
  }

}
