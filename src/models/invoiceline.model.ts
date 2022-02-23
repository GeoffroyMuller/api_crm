import { Model } from "objection"
import Vat from "./vat.model";

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

    static relationMappings = {
        vat: {
            relation: Model.BelongsToOneRelation,
            modelClass: Vat,
            join: {
                from: 'invoice_lines.idVat',
                to: 'vat.id'
            }
        },
    };
}

