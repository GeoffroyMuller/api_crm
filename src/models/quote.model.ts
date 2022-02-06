import { Model, Pojo } from "objection"
import Client from "./client.model";
import QuoteLine from "./quoteline.model";
import User from "./user.model";



export default class Quote extends Model {
    id?: number;
    idClient?: number;
    idResponsible?: number;
    idCompany?: number;
    identifier?: string;
    name?: string;
    lines?: Array<QuoteLine>;
    client?: Client;
    responsible?: User;

    footer?: string;
    modalities?: string;
    madeAt?: string;
    madeOn?: string;

    status?: 'draft' | 'validated' | 'refused';


    $formatJson(json: Pojo): Pojo {
        json = super.$formatJson(json)
        json.identifier = '#' + json.identifier
        return json
    }

    static get tableName() {
        return 'quotes'
    }

    static relationMappings = {
        responsible: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'quotes.idResponsible',
                to: 'users.id'
            }
        },
        client: {
            relation: Model.BelongsToOneRelation,
            modelClass: Client,
            join: {
                from: 'quotes.idClient',
                to: 'clients.id'
            }
        },
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

