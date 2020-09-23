export interface Debt {
  id: string;
  name: string;
  debt: number;
  loanDate?: Date;
  paymentDate?: Date;
}

// export class DebtInstance implements Debt {
//   id = this.source?.id;
//   name: string;
//   debt: number;
//   loanDate = this.source?.loanDate ? new Date(this.source?.loanDate) : null;

//   constructor(private source: Partial<Debt>) {}

//   toJSON(): Debt {
//     const { source, ...rest } = this;
//     return { ...rest };
//   }
// }
