import Product from "./product.model";
import User from "../users/user.model";
import ProductField from "./product_field.model";

async function findAll(idCompany: number) {
  let query = Product.query().where("idCompany", idCompany);
  return await query;
}

async function paginate(queryStr: any, idCompany: number) {
  let query = Product.query().where("idCompany", idCompany);

  query.page(queryStr.page ? queryStr.page - 1 : 0, queryStr.pageSize || 5);

  if (queryStr.order && queryStr.orderBy) {
    query.orderBy(queryStr.orderBy, queryStr.order);
  }

  return await query.execute();
}

async function getById(id: number): Promise<Product> {
  return (await Product.query()
    .findById(id)
    .withGraphFetched("products_real")
    .withGraphFetched("product_fields")) as ProductField as Product;
}

async function deleteById(id: number, auth: User) {
  const product = await Product.query().findById(id);
  if (product?.idCompany == auth?.company?.id) {
    return await Product.query().deleteById(id);
  } else {
    return undefined;
  }
}

async function create(body: any, auth: User) {
  return await Product.query().insertGraphAndFetch({
    ...body,
    idCompany: auth.idCompany,
    stock: body.stock != null ? body.stock : 0,
    product_fields: body.product_fields?.map((elem: any) => {
      return { ...elem, props: JSON.stringify(elem.props) };
    }),
  });
}

async function update(id: number, body: any, auth: User) {
  return await Product.query().upsertGraphAndFetch(
    {
      ...body,
      id,
      idCompany: auth.idCompany,
      stock: body.stock != null ? body.stock : 0,
      product_fields: body.product_fields?.map((elem: any) => {
        return { ...elem, props: JSON.stringify(elem.props) };
      }),
    },
    { relate: true, unrelate: true }
  );
}

export default {
  findAll,
  paginate,
  update,
  create,
  getById,
  deleteById,
};
