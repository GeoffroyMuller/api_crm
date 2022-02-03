import { Model } from "objection"

export default class QuoteLine extends Model {
   id?: number;
   idQuote?: number;
   description?: string;
   qty?: number;
   unit_price?: number;
   discount?: number;
   discount_type?: '€' | '%';
   type?: "title" | "product" | "comment" | "discount"



    static get tableName() {
        return 'quote_lines'
    }
}

