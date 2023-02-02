import serviceFactory from "../../core/service";
import User from "../users/user.model";
import Sale from "./sale.model";
import SaleProduct from "./sale_product.model";
import saleProductService from "./sale_product.service";
import SaleProductReal from "./sale_product_real.model";
import saleProductRealService from "./sale_product_real.service";

const saleService = serviceFactory<Sale, User>(Sale, {
  isAuthorized: async (model: Sale | Object, user: User) => {
    return Sale.fromJson(model)?.idCompany == user?.idCompany;
  },
  async onBeforeCreate({ query, auth, filters, data }) {
    return {
      query,
      auth,
      filters,
      data: {
        ...data,
        idCompany: auth.idCompany,
        idSeller: auth.id,
      },
    };
  },
  async onBeforeUpdate({ query, auth, filters, data }) {
    return {
      query,
      auth,
      filters,
      data,
    };
  },
});
saleService.create = async (body: any, auth) => {
  const { data, query } = await saleService.onBeforeCreate({
    query: Sale.query(),
    data: body,
    auth,
  });
  await saleService.checkAuthorization(data, auth);
  const saleRes: Sale = await query.insert(data).execute();
  for (const saleProduct of data.product_lines) {
    await saleProductService.create(
      {
        idSale: saleRes.id,
        idProduct: saleProduct.idProduct,
        price: saleProduct.saleProductPrice,
        quantity: saleProduct.quantity,
      } as SaleProduct,
      auth
    );
  }
  for (const saleProductReal of data.product_real_lines) {
    await saleProductRealService.create(
      {
        idSale: saleRes.id,
        idProductReal: saleProductReal.idProductReal,
        price: saleProductReal.saleProductRealPrice,
      } as SaleProductReal,
      auth
    );
  }

  const { data: result } = await saleService.onAfterCreate({
    query,
    data: saleRes,
    auth,
  });
  return result;
};
saleService.update = async (body: any, auth) => {
  const { data, query } = await saleService.onBeforeUpdate({
    query: Sale.query(),
    data: body,
    auth,
  });
  console.error("========", {
    data,
    dataproducts: data.product_lines,
    dataproductsreal: data.product_real_lines,
  });
  await saleService.getById(data.id, auth);
  return (await query.upsertGraphAndFetch(
    {
      id: data.id,
      product_lines: data.product_lines.map((productLine: any) => {
        return {
          id: productLine.id,
          saleProductPrice: productLine.saleProductPrice,
          quantity: productLine.quantity,
        };
      }),
      product_real_lines: data.product_real_lines.map((productRealLine: any)=>{
        return {
          id: productRealLine.id,
          saleProductRealPrice: productRealLine.saleProductRealPrice,
        } 
      })
    } as Sale,
    { relate: true, unrelate: true }
  )) as unknown as Sale;
};

export default saleService;
