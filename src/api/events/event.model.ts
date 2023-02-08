import { Model, Pojo } from "objection";
import Company from "../companies/company.model";


export default class Event extends Model {
  id?: number;
  dtstamp?: string;
  dtstart?: string;
  dtend?: string;
  summary?: string;
  description?: string;
  location?: string;
  recurrence_freq?: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
  recurrence_interval?: number;
  recurrence_count?: number;
  recurrence_until?: string;

  idCompany?: number;
  company?: Company;

  idProduct?: number;

  
  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json)
    return json
  }

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
