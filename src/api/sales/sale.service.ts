import serviceFactory from "../../core/service";
import User from "../users/user.model";
import Sale from "./sale.model";

const saleService = serviceFactory<Sale, User>(Sale, {
    isAuthorized: async (model: Sale | Object, user: User) => {
        return Sale.fromJson(model)?.idCompany == user?.idCompany;
      },
});

export default saleService;
