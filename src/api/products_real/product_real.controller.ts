import controllerFactory from "../../core/controller";
import productRealService from "./product_real.service";

const productRealController = controllerFactory(productRealService);

export default productRealController;