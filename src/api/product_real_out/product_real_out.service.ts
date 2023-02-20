import serviceFactory from "../../core/service";
import User from "../users/user.model";
import ProductRealOut from "./product_real_out.model";

const product_real_outService = serviceFactory<ProductRealOut, User>(
    ProductRealOut,
  {
    isAuthorized: async (model: ProductRealOut | Object, user: User) => {
      return ProductRealOut.fromJson(model)?.idCompany == user?.idCompany;
    },
    async onBeforeFetchList({ query, auth, filters, data }) {
      if (auth != null) {
        if (auth.idCompany) {
          query.where("idCompany", auth.idCompany);
        }
      }
      return { query, auth, filters, data };
    },
    async onBeforeCreate({ query, auth, filters, data }) {
      return {
        query,
        auth,
        filters,
        data: { ...data, idCompany: auth.idCompany },
      };
    },
    async onBeforeUpdate({ query, auth, filters, data }) {
      return {
        query,
        auth,
        filters,
        data: { ...data, idCompany: auth.idCompany },
      };
    },
  }
);

export default product_real_outService;
