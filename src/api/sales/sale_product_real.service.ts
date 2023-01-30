import serviceFactory from "../../core/service";
import User from "../users/user.model";
import SaleProductReal from "./sale_product_real.model";

const saleProductRealService = serviceFactory<SaleProductReal, User>(SaleProductReal, {});

export default saleProductRealService;
