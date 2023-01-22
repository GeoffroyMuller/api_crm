import controllerFactory from "../../core/controller";
import productService from "./product.service";

const productController = controllerFactory(productService);

export default productController;