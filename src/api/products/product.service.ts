import { query } from "express";
import Product from "./product.model";
import User from "../users/user.model";

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
    .withGraphFetched("products_real")) as Product;
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
  return await Product.query().insertAndFetch({
    ...body,
    idCompany: auth.idCompany,
  });
}

async function update(id: number, body: any) {
  return await Product.query().updateAndFetchById(id, body);
}

export default {
  findAll,
  paginate,
  update,
  create,
  getById,
  deleteById,
};
