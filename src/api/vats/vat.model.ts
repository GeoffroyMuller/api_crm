import { Model } from "objection"

export default class Vat extends Model {

    id?: number
    rate?: number;
    idCompany?: number;

    static get tableName() {
        return 'vat'
    }
}