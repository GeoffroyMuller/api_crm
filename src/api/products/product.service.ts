import { raw } from "objection";
import serviceFactory from "../../core/service";
import ProductReal from "../products_real/product_real.model";
import User from "../users/user.model";
import Product from "./product.model";

const productService = serviceFactory<Product, User>(Product, {
  isAuthorized: async (model: Product | Object, user: User) => {
    return Product.fromJson(model)?.idCompany == user?.idCompany;
  },
  async onBeforeFetchList({ query, auth, filters, data }) {
    if (auth != null) {
      if (auth.idCompany) {
        query.where("idCompany", auth.idCompany);
      }
    }
    query.select(`${Product.tableName}.*`);
    const populateStockIndex = (
      (filters?.populate || []) as string[]
    ).findIndex((p) => p === "stock_physical");
    if (populateStockIndex !== -1) {
      query.select(
        raw(`(
        SELECT COUNT(*)
        FROM ${ProductReal.tableName}
        WHERE ${ProductReal.tableName}.idProduct = ${Product.tableName}.id
      )`).as("stock_physical")
      );
    }
    return { query, auth, filters, data };
  },
  async onBeforeCreate({ query, auth, filters, data }) {
    return {
      query,
      auth,
      filters,
      data: _mapProductData(data, auth),
    };
  },
  async onBeforeUpdate({ query, auth, filters, data }) {
    return {
      query,
      auth,
      filters,
      data: _mapProductData(data, auth),
    };
  },
});

function _mapProductData(product: Product, auth: User) {
  return {
    ...product,
    idCompany: auth.idCompany,
    stock: product.stock != null ? product.stock : 0,
    product_fields: product.product_fields?.map((elem: any) => {
      return { ...elem, props: JSON.stringify(elem.props) };
    }),
  };
}

productService.create = async (body: any, auth) => {
  const { data, query } = await productService.onBeforeCreate({
    query: Product.query(),
    data: body,
    auth,
  });
  await productService.checkAuthorization(data, auth);
  return (await query.insertGraphAndFetch({ ...data })) as unknown as Product;
};

productService.update = async (body: any, auth) => {
  const { data, query } = await productService.onBeforeUpdate({
    query: Product.query(),
    data: body,
    auth,
  });
  await productService.getById(data.id, auth);
  return (await query.upsertGraphAndFetch(
    {
      id: data.id,
      ...data,
    },
    { relate: true, unrelate: true }
  )) as unknown as Product;
};

export default productService;
