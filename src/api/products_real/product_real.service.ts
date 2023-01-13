import serviceFactory from "../../core/service";
import ProductReal from "./product_real.model";

const productRealService = serviceFactory(ProductReal);

productRealService.create = async (body: any) => {
  return (await ProductReal.query().upsertGraphAndFetch(
    {
      ...body,
      product_real_fields: body.product_real_fields.map((elem: any)=>{
        return {...elem, value: JSON.stringify(elem.value)}
      })
    },
    { relate: true }
  )) as unknown as ProductReal;
};

productRealService.update = async (body: any) => {
  return (await ProductReal.query().upsertGraphAndFetch(
    {
      id: body.id,
      ...body,
      product_real_fields: body.product_real_fields.map((elem: any)=>{
        return {...elem, value: JSON.stringify(elem.value)}
      })
    },
    { relate: true, unrelate: true }
  )) as unknown as ProductReal;
};

export default productRealService;
