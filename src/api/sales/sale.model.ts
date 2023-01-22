import { Model } from "objection";
import Client from "../clients/client.model";
import Product from "../products/product.model";
import ProductReal from "../products_real/product_real.model";

export default class Sale extends Model {
  id?: number;
  idCompany?: number;
  idCustomer?: number;
  idSeller?: number;
  date?: string;
  created_at?: string;

  products?: Array<Product>;
  products_real?: Array<ProductReal>;
  customer?: Client;

  static get tableName() {
    return "sales";
  }

  static get relationMappings() {
    const ProductModel = require("../products/product.model").default;
    const ProductRealModel =
      require("../products_real/product_real.model").default;
    const ClientModel = require("../clients/client.model").default;

    return {
      products: {
        relation: Model.ManyToManyRelation,
        modelClass: ProductModel,
        join: {
          from: "sales.id",
          through: {
            from: "sales_products.idSale",
            to: "sales_products.idProduct",
            extra: {
              saleProductPrice: "price",
            },
          },
          to: "products.id",
        },
      },
      productReal: {
        relation: Model.ManyToManyRelation,
        modelClass: ProductRealModel,
        join: {
          from: "sales.id",
          through: {
            from: "sales_products_real.idSale",
            to: "sales_products_real.idProductReal",
            extra: {
              saleProductRealPrice: "price",
            },
          },
          to: "products_real.id",
        },
      },
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: ClientModel,
        join: {
          from: "sales.idCustomer",
          to: "clients.id",
        },
      },
    };
  }
}
