import { Model } from "objection"
import QuoteLine from "./quoteline.model";



export default class Quote extends Model {
   id?: number;
   idClient?: number;
   idResponsible?: number;
   idCompany?: number;
   identifier?: string;
   name?: string;
   lines?: Array<QuoteLine>


    static get tableName() {
        return 'quotes'
    }

    static relationMappings = {
        lines: {
            relation: Model.HasManyRelation,
            modelClass: QuoteLine,
            join: {
                from: 'quotes.id',
                to: 'quote_lines.idQuote'
            }
        },
    };
}

