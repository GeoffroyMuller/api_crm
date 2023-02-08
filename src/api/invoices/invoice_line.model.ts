import { Model } from "objection";
import SaleLine from "../sales/sale_line.model";
import Product from "../products/product.model";
import Vat from "../vats/vat.model";
import InvoiceSubline from "./invoice_subline.model";

export default class InvoiceLine extends SaleLine<InvoiceSubline> {
  idInvoice?: number;

  static get tableName() {
    return "invoice_lines";
  }

    static get relationMappings() {
    const InvoiceSublineModel = require("./invoice_subline.model").default;
    return {
      sublines: {
        relation: Model.HasManyRelation,
        modelClass: InvoiceSublineModel,
        join: {
          from: InvoiceLine.tableName + ".id",
          to: "invoice_sublines.idLine",
        },
      },
      vat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vat,
        join: {
          from: InvoiceLine.tableName + ".idVat",
          to: "vat.id",
        },
      },
      product: {
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join: {
          from: InvoiceLine.tableName +".idProduct",
          to: "products.id",
        },
      },
    };
  }
}
