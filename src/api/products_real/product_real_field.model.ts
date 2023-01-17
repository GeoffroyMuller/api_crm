import { Model, Pojo } from "objection";
import ProductField from "../products/product_field.model";
import ProductReal from "./product_real.model";

export default class ProductRealField extends Model {
  id?: number;
  idProductReal?: number;
  idProductField?: number;
  value?: string | number;

  productReal?: ProductReal;
  productField?: ProductField;

  static get tableName() {
    return "product_real_fields";
  }

  static get jsonSchema() {
    return {
      required: ["idProductReal", "idProductField"],
    };
  }

  $formatJson(json: Pojo): Pojo {
    json = super.$formatJson(json);
    if (json.hasOwnProperty("value") && json.value != null) {
      json.value = JSON.parse(json.value);
    }
    return json;
  }

  static relationMappings = {
    productReal: {
      relation: Model.BelongsToOneRelation,
      modelClass: ProductReal,
      join: {
        from: "product_real_fields.idProductReal",
        to: "products_real.id",
      },
    },
    productField: {
      relation: Model.BelongsToOneRelation,
      modelClass: ProductField,
      join: {
        from: "product_real_fields.idProductField",
        to: "product_fields.id",
      },
    },
  };
}
