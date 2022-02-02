import { Model, Pojo } from "objection"

export default class User extends Model {

    $formatJson(json: Pojo): Pojo {
        json = super.$formatJson(json)
        delete json.password
        return json
    }

    static get tableName() {
        return 'users'
    }
}