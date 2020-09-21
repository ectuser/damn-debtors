export interface DatabaseDebt {
  id: string;
  userId?: string;
  name: string;
  debt: number;
  loanDate?: string;
  paymentDate?: string;
}
