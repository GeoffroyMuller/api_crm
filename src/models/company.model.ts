import { Model } from "objection"

export default class Company extends Model {


    static get tableName() {
        return 'companies'
    }
}

