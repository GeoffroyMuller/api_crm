import controllerFactory from "../../core/controller";
import saleService from "./sale.service";

const saleController = controllerFactory(saleService);

export default saleController;