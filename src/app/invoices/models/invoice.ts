export class Invoice {
    pos: number;
    _id: string;
    item: string;
    qty: number;
    date: Date;
    due: Date;
    tax: number;
    rate: number;
    client: {
        firstName: string;
        lastName: string;
        email: string;
    }
}

export class InvoicePaginationRsp{
    docs: Invoice[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}
