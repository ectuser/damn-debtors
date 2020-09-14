export interface DatabaseDebtor {
    id: number;
    name: string;
    debt: number;
    loanDate?: string;
    paymentDate?: string;
}