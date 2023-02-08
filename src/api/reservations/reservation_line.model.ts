import { Model } from "objection";
import SaleLine from "../sales/sale_line.model";
import Product from "../products/product.model";
import Vat from "../vats/vat.model";
import ReservationSubline from "./reservation_subline.model";

export default class ReservationLine extends SaleLine<ReservationSubline> {
  idReservation?: number;

  static get tableName() {
    return "reservation_lines";
  }

    static get relationMappings() {
    const ReservationSublineModel = require("./reservation_subline.model").default;
    return {
      sublines: {
        relation: Model.HasManyRelation,
        modelClass: ReservationSublineModel,
        join: {
          from: ReservationLine.tableName + ".id",
          to: "reservation_sublines.idLine",
        },
      },
      vat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vat,
        join: {
          from: ReservationLine.tableName + ".idVat",
          to: "vat.id",
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: ReservationLine.tableName +".idProduct",
          to: "products.id",
        },
      },
    };
  }
}
