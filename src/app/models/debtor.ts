export interface Debtor {
    _id: number;
    name: string;
    debt: number;
    loanDate?: Date;
    paymentDate?: Date;
}