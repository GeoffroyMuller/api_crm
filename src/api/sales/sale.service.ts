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

export default saleService;
