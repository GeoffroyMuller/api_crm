import { Model, Pojo } from "objection"
import Company from "./company.model";




export default class Client extends Model {
    id?: number
    firstname?: string
    lastname?: string
    address?: string
    phone?: string
    email?: string
    idCompany?: number;
    description?: string;
    company?: Company;


    static get tableName() {
        return 'clients'
    }

    static relationMappings = {
        company: {
            relation: Model.BelongsToOneRelation,
            modelClass: Company,
            join: {
                from: 'clients.idCompany',
                to: 'companies.id'
            }
        },
        
    };
}

