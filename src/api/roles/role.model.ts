import { Model, Pojo } from "objection";

export default class Role extends Model {
  id?: number;
  name?: string;
  idCompany?: number;
  rights?: string;

  static get tableName() {
    return "roles";
  }

  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    if (typeof json.rights === 'string') {
      json.rights = JSON.parse(json.rights);
    }

    return json;
  }
}
