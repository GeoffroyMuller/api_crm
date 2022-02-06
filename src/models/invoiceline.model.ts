import { Model } from "objection"

export default class InvoiceLine extends Model {
    id?: number;
    idInvoice?: number;
    description?: string;
    qty?: number;
    unit_price?: number;
    discount?: number;
    discount_type?: '€' | '%';
    type?: "title" | "product" | "comment" | "discount"



    static get tableName() {
        return 'invoice_lines'
    }
}

