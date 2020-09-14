export interface Debtor {
    id: number;
    name: string;
    debt: number;
    loanDate?: Date;
    paymentDate?: Date;
}