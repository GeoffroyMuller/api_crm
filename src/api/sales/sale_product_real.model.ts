import { Model } from "objection";

export default class SaleProductReal extends Model {
  idSale?: number;
  idProductReal?: number;
  price?: number;

  static get tableName() {
    return "sales_products_real";
  }
}
