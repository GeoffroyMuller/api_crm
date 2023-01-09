import { Model } from "objection";
import Product from "./product.model";

export default class ProductReal extends Model {
  id?: number;
  idProduct?: number;
  product?: Product;

  reference?: string;

  static get tableName() {
    return "products_real";
  }

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "product_real.idProduct",
        to: "products.id",
      },
    },
  };
}
