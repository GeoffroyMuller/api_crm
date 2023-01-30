import serviceFactory from "../../core/service";
import User from "../users/user.model";
import SaleProduct from "./sale_product.model";

const saleProductService = serviceFactory<SaleProduct, User>(SaleProduct, {});

export default saleProductService;
