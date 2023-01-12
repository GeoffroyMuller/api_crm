import { Model } from "objection";
import ProductField from "./product_field.model";
import ProductReal from "../products_real/product_real.model";

export default class Product extends Model {
  id?: number;
  idCompany?: number;
  name?: string;
  description?: string;
  price?: number;
  isNumeraryStock?: boolean;
  stockManagement?: "none" | "numerary" | "physical";
  stock?: number;

  products_real?: Array<ProductReal>;
  product_fields?: Array<ProductField>;

  static get tableName() {
    return "products";
  }

  static get relationMappings() {
    return {
      products_real: {
        relation: Model.HasManyRelation,
        modelClass: ProductReal,
        join: {
          from: "products.id",
          to: "products_real.idProduct",
        },
      },
      product_fields: {
        relation: Model.HasManyRelation,
        modelClass: ProductField,
        join: {
          from: "products.id",
          to: "product_fields.idProduct",
        },
      },
    };
  }
}
