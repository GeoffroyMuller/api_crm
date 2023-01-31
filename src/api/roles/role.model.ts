
import { Model } from "objection";
import Right from "../rights/right.model";

export default class Role extends Model {
  id?: number;
  name?: string;
  idCompany?: number;
  rights?: Right[];

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
