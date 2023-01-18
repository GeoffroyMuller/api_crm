import { Model } from "objection";
import Company from "../companies/company.model";


export default class Event extends Model {
  id?: number;
  dtstamp?: string;
  dtstart?: string;
  dtend?: string;
  summary?: string;
  description?: string;
  location?: string;
  rrule?: string;
  organizer?: string;
  attendee?: string;
  status?: string;


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
