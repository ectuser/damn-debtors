export interface Debt {
  id?: string;
  name: string;
  debt: number;
  loanDate?: string | Date;
  paymentDate?: string | Date;
}

export class DebtInstance implements Debt {
  id? = this.source?.id;
  name: string = this.source?.name;
  debt: number = this.source?.debt;
  loanDate?: Date = this.source?.loanDate
    ? new Date(this.source?.loanDate)
    : null;
  paymentDate?: Date = this.source?.paymentDate
    ? new Date(this.source?.paymentDate)
    : null;

  constructor(private source: Partial<Debt>) {}

  toJSON(): Debt {
    const obj = {
      ...this,
      loanDate: this.loanDate ? this.loanDate.toDateString() : null,
      paymentDate: this.paymentDate ? this.paymentDate.toDateString() : null,
    };
    console.log(obj);

    return obj;
  }
}
