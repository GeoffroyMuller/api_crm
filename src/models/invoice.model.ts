import { Model, Pojo } from "objection";
import Client from "./client.model";
import User from "./user.model";


export default class Invoice extends Model {
    id?: number;

    idClient?: number;
    clientFirstname?: string
    clientLastname?: string
    clientAddress?: string
    clientPhone?: string
    clientEmail?: string
    clientCompanyName?: string

    idResponsible?: number;
    idCompany?: number;
    identifier?: string;
    name?: string;
    client?: Client;
    responsible?: User;

    modalities?: string;
    footer?: string;
    madeAt?: string;
    madeOn?: string;

    status?: 'draft' | 'validated' | 'refused';

    $formatJson(json: Pojo): Pojo {
        json = super.$formatJson(json)
        json.identifier = '#' + json.identifier
        return json
    }

    static get tableName() {
        return 'invoices'
    }

    static relationMappings = {
        responsible: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
                from: 'invoices.idResponsible',
                to: 'users.id'
            }
        },
        client: {
            relation: Model.BelongsToOneRelation,
            modelClass: Client,
            join: {
                from: 'invoices.idClient',
                to: 'clients.id'
            }
        }
    }
}