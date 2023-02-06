import { Model } from "objection";
import { ID } from "../../core/types";
import ProductReal from "../products_real/product_real.model";

export default class SaleSubline extends Model {
  id?: ID;
  idSaleLine?: number;
  idProductReal?: number;

  productReal?: ProductReal;

  static get tableName() {
    return "sale_sublines";
  }

  static get relationMappings() {
    const ProductRealModel =
      require("../products_real/product_real.model").default;
    return {
      productReal: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductRealModel,
        join: {
          from: "sale_sublines.idProductReal",
          to: "sale_lines.id",
        },
      },
    };
  }
}
