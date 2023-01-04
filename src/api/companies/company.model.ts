import { Model } from "objection"
import Vat from "../vats/vat.model";

export default class Company extends Model {

    id?: number;
    name?: string;
    idCompany?: number;
    clientCompanies?: Array<Company>;

    static get tableName() {
        return 'companies'
    }

    static relationMappings = {
        vat: {
            relation: Model.HasManyRelation,
            modelClass: Vat,
            join: {
                from: 'companies.id',
                to: 'vat.idCompany'
            }
        },
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

