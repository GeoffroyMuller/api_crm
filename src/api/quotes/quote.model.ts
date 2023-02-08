import { Model, Pojo } from "objection"
import Client from "../clients/client.model";
import Invoice from "../invoices/invoice.model";
import QuoteLine from "./quote_line.model";
import User from "../users/user.model";
import { orderBy } from "lodash";



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

    archived?: boolean;
    totalPrice?: number;

    invoices?: Array<Invoice>;


    $formatJson(json: Pojo): Pojo {
        json = super.$formatJson(json)
        json.identifier = '#' + json.identifier;
        if (json.lines?.length) {
            json.lines = orderBy(json.lines, 'order')
        }
        return json
    }

    static get tableName() {
        return 'quotes'
    }

    static relationMappings = {
        invoices: {
            relation: Model.HasManyRelation,
            modelClass: Invoice,
            join: {
                from: 'quotes.id',
                to: 'invoices.idQuote'
            }
        },
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
                to: QuoteLine.tableName + '.idQuote'
            }
        },
    };
}

