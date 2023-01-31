
import { Model } from "objection";
import Right from "./right.model";

export default class Role extends Model {
  id?: number;
  name?: string;

  static get tableName() {
    return "roles";
  }

  static get relationMappings() {
    return {
      rights: {
        relation: Model.ManyToManyRelation,
        modelClass: Right,
        join: {
          from: "roles.id",
          through: {
            from: "roles_rights.idRole",
            to: "roles_rights.idRight",
          },
          to: "rights.id",
        },
      },
    }
  }

  
}
