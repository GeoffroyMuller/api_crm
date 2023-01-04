import { Model, Pojo } from "objection";

export default class Product extends Model {
  id?: number;
  idCompany?: number;
  name?: string;
  description?: string;
  price?: number;

  static get tableName() {
    return "products";
  }
}
