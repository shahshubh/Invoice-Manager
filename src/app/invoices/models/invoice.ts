export class Invoice {
    pos: number;
    _id: string;
    item: string;
    qty: number;
    date: Date;
    due: Date;
    tax: number;
}

export class InvoicePaginationRsp{
    docs: Invoice[];
    total: number;
    pages: number;
    page: number;
    limit: number;
}
