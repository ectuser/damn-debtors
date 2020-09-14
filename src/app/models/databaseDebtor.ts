export interface DatabaseDebtor {
    _id: number;
    name: string;
    debt: number;
    loanDate?: string;
    paymentDate?: string;
}