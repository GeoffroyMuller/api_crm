import { Model } from "objection"
import Product from "../products/product.model";
import Vat from "../vats/vat.model";

export default class QuoteLine extends Model {
   id?: number;
   idQuote?: number;
   idProduct?: number;
   description?: string;
   qty?: number;
   unit_price?: number;
   discount?: number;
   discount_type?: '€' | '%';
   type?: "title" | "product" | "comment" | "discount"
   idVat?: number;
   product?: Product;

   vat?: Vat;


    static get tableName() {
        return 'sale_lines'
    }

    static relationMappings = {
        vat: {
            relation: Model.BelongsToOneRelation,
            modelClass: Vat,
            join: {
                from: QuoteLine.tableName + '.idVat',
                to: 'vat.id'
            }
        },
        product: {
            relation: Model.BelongsToOneRelation,
            modelClass: Product,
            join: {
                from: QuoteLine.tableName + '.idProduct',
                to: 'products.id'
            }
        }
    };
}

