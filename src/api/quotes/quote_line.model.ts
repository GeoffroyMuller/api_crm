import { Model } from "objection";
import SaleLine from "../sales/sale_line.model";
import Product from "../products/product.model";
import Vat from "../vats/vat.model";
import QuoteSubline from "./quote_subline.model";

export default class QuoteLine extends SaleLine<QuoteSubline> {
  idQuote?: number;

  static get tableName() {
    return "quote_lines";
  }

    static get relationMappings() {
    const QuoteSublineModel = require("./quote_subline.model").default;
    return {
      sublines: {
        relation: Model.HasManyRelation,
        modelClass: QuoteSublineModel,
        join: {
          from: QuoteLine.tableName + ".id",
          to: "quote_sublines.idLine",
        },
      },
      vat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vat,
        join: {
          from: QuoteLine.tableName + ".idVat",
          to: "vat.id",
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: QuoteLine.tableName +".idProduct",
          to: "products.id",
        },
      },
    };
  }
}
