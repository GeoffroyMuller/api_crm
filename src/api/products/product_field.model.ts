import { Model } from "objection";
import Product from "./product.model";

export default class ProductField extends Model {
  id?: number;
  idProduct?: number;
  name?: string;
  type?: string;

  product?: Product;

  static get tableName() {
    return "product_fields";
  }

  static relationMappings = {
    product: {
      relation: Model.BelongsToOneRelation,
      modelClass: Product,
      join: {
        from: "product_fields.idProduct",
        to: "products.id",
      },
    },
  };
}
