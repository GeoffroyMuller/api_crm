import { Model, Pojo } from "objection";
import ProductReal from "./product_real.model";

export default class Product extends Model {
  id?: number;
  idCompany?: number;
  name?: string;
  description?: string;
  price?: number;
  isNumeraryStock?: boolean;
  stock?: number;

  products_real?: Array<ProductReal>;

  static get tableName() {
    return "products";
  }

  static relationMappings = {
    products_real: {
      relation: Model.HasManyRelation,
      modelClass: ProductReal,
      join: {
        from: "products.id",
        to: "products_real.idProduct",
      },
    },
  };
}
