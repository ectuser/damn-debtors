export interface Debt {
    id: number;
    name: string;
    debt: number;
    loanDate?: Date;
    paymentDate?: Date;
}