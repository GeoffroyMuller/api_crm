import { Model } from "objection"
import Product from "../products/product.model";
import Vat from "../vats/vat.model";

export default class InvoiceLine extends Model {
    id?: number;
    idInvoice?: number;
    idProduct?: number;
    description?: string;
    qty?: number;
    unit_price?: number;
    discount?: number;
    discount_type?: '€' | '%';
    type?: "title" | "product" | "comment" | "discount"
    product?: Product;
    vat?: Vat;
    order?: number;


    static get tableName() {
        return 'sale_lines'
    }

    static relationMappings = {
        vat: {
            relation: Model.BelongsToOneRelation,
            modelClass: Vat,
            join: {
                from: 'sale_lines.idVat',
                to: 'vat.id'
            }
        },
        product: {
            relation: Model.BelongsToOneRelation,
            modelClass: Product,
            join: {
                from: 'sale_lines.idProduct',
                to: 'products.id'
            }
        }
    };
}

