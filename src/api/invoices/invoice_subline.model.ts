import { Model } from "objection";
import SaleSubline from "../sales/sale_subline.model";

export default class InvoiceSubline extends SaleSubline {

  static get tableName() {
    return "invoice_sublines";
  }

  static get relationMappings() {
    const ProductRealModel =
      require("../products_real/product_real.model").default;
    return {
      productReal: {
        relation: Model.BelongsToOneRelation,
        modelClass: ProductRealModel,
        join: {
          from: InvoiceSubline.tableName + ".idProductReal",
          to: "products_real.id",
        },
      },
    };
  }
}
