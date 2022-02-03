import { Model, Pojo } from "objection"

export default class User extends Model {

    id?: number
    firstname?: string
    lastname?: string
    address?: string
    phone?: string
    email?: string
    password?: string
    idCompany?: number;

    $formatJson(json: Pojo): Pojo {
        json = super.$formatJson(json)
        delete json.password
        return json
    }

    static get tableName() {
        return 'users'
    }
}