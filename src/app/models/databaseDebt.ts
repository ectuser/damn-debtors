export interface DatabaseDebt {
    id: number;
    name: string;
    debt: number;
    loanDate?: string;
    paymentDate?: string;
}