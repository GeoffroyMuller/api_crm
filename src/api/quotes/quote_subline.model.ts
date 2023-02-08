import { Model } from "objection";
import SaleSubline from "../sales/sale_subline.model";

export default class QuoteSubline extends SaleSubline {

  static get tableName() {
    return "quote_sublines";
  }

  static get relationMappings() {
    const ProductRealModel =
      require("../products_real/product_real.model").default;
    return {
      productReal: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductRealModel,
        join: {
          from: QuoteSubline.tableName + ".idProductReal",
          to: "products_real.id",
        },
      },
    };
  }
}
