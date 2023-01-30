import { Model } from "objection";

export default class SaleProduct extends Model {
  idSale?: number;
  idProduct?: number;
  price?: number;
  quantity?: number;

  static get tableName() {
    return "sales_products";
  }
}
