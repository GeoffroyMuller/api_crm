import { Model } from "objection";
import Client from "../clients/client.model";
import ReservationLine from "./reservation_line.model";

export default class Reservation extends Model {
  id?: number;
  idCompany?: number;
  idClient?: number;
  customerName?: string;
  description?: string;
  dtstart?: string;
  dtend?: string;
  created_at?: string;

  lines?: Array<ReservationLine>;

  client?: Client;

  static get tableName() {
    return "reservations";
  }

  static get relationMappings() {
    const ClientModel = require("../clients/client.model").default;
    const ReservationLineModel = require("./reservation_line.model").default;
    return {
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClientModel,
        join: {
          from: Reservation.tableName + ".idClient",
          to: ClientModel.tableName + ".id",
        },
      },
      lines: {
        relation: Model.HasManyRelation,
        modelClass: ReservationLineModel,
        join: {
          from: Reservation.tableName + ".id",
          to: ReservationLineModel.tableName + ".idReservation",
        },
      },
    };
  }
}
