import { Model } from "objection";
import ProductField from "./product_field.model";
import ProductReal from "../products_real/product_real.model";
import Vat from "../vats/vat.model";
import Event from "../events/event.model"

export default class Product extends Model {
  id?: number;
  idCompany?: number;
  idVat?: number;
  name?: string;
  description?: string;
  price?: number;
  stockManagement?: "numerary" | "physical" | null | "events";
  stock?: number;
  stock_physical?: number;

  products_real?: Array<ProductReal>;
  product_fields?: Array<ProductField>;

  events?: Array<Event>;

  static get tableName() {
    return "products";
  }

  static get relationMappings() {
    return {
      events: {
        relation: Model.HasManyRelation,
        modelClass: Event,
        join: {
          from: "products.id",
          to: Event.tableName + ".idProduct",
        },
      },
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
      vat: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vat,
        join: {
          from: "products.idVat",
          to: "vat.id",
        },
      },
    };
  }
}
