import { Model } from "objection"

export default class Company extends Model {

    id?: number;
    name?: string;
    idCompany?: number;
    clientCompanies?: Array<Company>;

    static get tableName() {
        return 'companies'
    }

    static relationMappings = {
        clientCompanies: {
            relation: Model.HasManyRelation,
            modelClass: Company,
            join: {
                from: 'companies.id',
                to: 'companies.idCompany'
            }
        },
        
    };
}

