import { Model } from "objection";
import Company from "../companies/company.model";

export default class Event extends Model {
  idCompany?: number;
  company?: Company;

  static get tableName() {
    return "events";
  }

  static relationMappings = {
    company: {
      relation: Model.BelongsToOneRelation,
      modelClass: Company,
      join: {
        from: "clients.idCompany",
        to: "companies.id",
      },
    },
  };
}
