import { Model } from "objection"
import Vat from "../vats/vat.model";

export default class QuoteLine extends Model {
   id?: number;
   idQuote?: number;
   description?: string;
   qty?: number;
   unit_price?: number;
   discount?: number;
   discount_type?: '€' | '%';
   type?: "title" | "product" | "comment" | "discount"
   idVat?: number;

   vat?: Vat;


    static get tableName() {
        return 'quote_lines'
    }

    static relationMappings = {
        vat: {
            relation: Model.BelongsToOneRelation,
            modelClass: Vat,
            join: {
                from: 'quote_lines.idVat',
                to: 'vat.id'
            }
        },
    };
}

