import { Model } from "objection";
import Product from "../products/product.model";
import Vat from "../vats/vat.model";
import SaleSubline from "./sale_subline.model";

export default class SaleLine extends Model {
  id?: number;
  idSale?: number;
  idProduct?: number;
  description?: string;
  qty?: number;
  unit_price?: number;
  discount?: number;
  discount_type?: "€" | "%";
  type?: "title" | "product" | "comment" | "discount";
  idVat?: number;
  order?: number;

  product?: Product;
  vat?: Vat;

  sublines?: Array<SaleSubline>;

  static get tableName() {
    return "sale_lines";
  }

  static get relationMappings() {
    const SaleSublineModel = require("../sales/sale_subline.model").default;
    return {
      sublines: {
        relation: Model.HasManyRelation,
        modelClass: SaleSublineModel,
        join: {
          from: SaleLine.tableName + ".id",
          to: "sale_sublines.idSaleLine",
        },
      },
    };
  }
}
