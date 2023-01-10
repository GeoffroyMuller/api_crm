import { Model } from "objection";
import Product from "../products/product.model";
import ProductRealField from "./product_real_field.model";

export default class ProductReal extends Model {
  id?: number;
  idProduct?: number;
  product?: Product;

  reference?: string;

  product_real_fields?: Array<ProductRealField>;

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
    product_real_fields: {
      relation: Model.HasManyRelation,
      modelClass: Product,
      join: {
        from: "products_real.id",
        to: "product_real_fields.idProductReal",
      },
    }
  };
}
