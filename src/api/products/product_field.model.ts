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

  static get jsonSchema() {
    return {
      type: 'object',
      required: ["name", "type"],
      properties: {
        name: { type: 'string', minLength: 1, maxLength: 255 },
        type: { type: 'string', minLength: 1 }
      }
    };
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
