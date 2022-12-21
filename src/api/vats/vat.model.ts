import { Model } from "objection"

export default class Vat extends Model {

    id?: number
    rate?: number;

    static get tableName() {
        return 'vat'
    }

    
}