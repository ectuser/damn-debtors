import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtorService } from '../debtor.service';
import { Debtor } from '../models/debtor';

@Component({
  selector: 'app-debt',
  templateUrl: './debt.component.html',
  styleUrls: ['./debt.component.scss']
})
export class DebtComponent implements OnInit {
  private id;
  debt: Debtor;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private debtorsService: DebtorService) { }

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (isNaN(this.id)){
      console.log("Wrong path");
      this.router.navigate(['/debtors']);
    }

    this.debtorsService.findDebtById(this.id).subscribe((debtDB) => {
      let debt = this.debtorsService.transformDatabaseDebtorToDebtor(debtDB);
      this.debt = debt;
      console.log(debt);
    }, 
    (err) => {
      console.log("Wrong path");
      this.router.navigate(['/debtors']);
    });

  }

}
