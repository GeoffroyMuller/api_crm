import { Model } from "objection"
import QuoteLine from "./quoteline.model";



export default class Quote extends Model {
   id?: number;
   idClient?: number;
   idResponsible?: number;
   idCompany?: number;
   identifier?: string;
   name?: string;


    static get tableName() {
        return 'quotes'
    }

    static relationMappings = {
        parts: {
            relation: Model.HasManyRelation,
            modelClass: QuoteLine,
            join: {
                from: 'quotes.id',
                to: 'quote_lines.idQuote'
            }
        },
    };
}

