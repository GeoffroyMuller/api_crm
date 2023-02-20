
import { Model } from "objection";

export default class ProductRealOut extends Model {
  id!: number;
  idCompany!: number;
  idProductReal!: number;
  idClient!: number;
  idReservation!: number;
  dtstart!: Date;
  dtend!: Date;

  static get tableName() {
    return "product_real_out";
  }

  static get relationMappings() {
    const ProductRealModel = require('../products_real/product_real.model').default;
    const ClientModel = require('../clients/client.model').default;
    const ReservationModel = require('../reservations/reservation.model').default;

    return {
      productReal: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductRealModel,
        join: {
          from: `${ProductRealOut.tableName}.idProductReal`,
          to: `${ProductRealModel.tableName}.id`,
        },
      },
      client: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClientModel,
        join: {
          from: `${ProductRealOut.tableName}.idClient`,
          to: `${ClientModel.tableName}.id`,
        },
      },
      reservation: {
        relation: Model.BelongsToOneRelation,
        modelClass: ReservationModel,
        join: {
          from: `${ProductRealOut.tableName}.idReservation`,
          to: `${ReservationModel.tableName}.id`,
        },
      },
    };
  }
}
