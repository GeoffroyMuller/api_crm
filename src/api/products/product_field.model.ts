import { Model, Pojo } from "objection";
import Product from "./product.model";

interface IPropProductField {
  label: string;
  value: string;
}

export default class ProductField extends Model {
  id?: number;
  idProduct?: number;
  name?: string;
  type?: string;
  props?: { options: Array<IPropProductField> };

  product?: Product;

  static get tableName() {
    return "product_fields";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name", "type"],
      properties: {
        name: { type: "string", minLength: 1, maxLength: 255 },
        type: { type: "string", minLength: 1 },
        props: { type: "string" },
      },
    };
  }

  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    if (json.hasOwnProperty("props") && json.props != null) {
      json.props = JSON.parse(json.props);
    }
    return json;
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
