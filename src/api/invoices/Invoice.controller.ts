import controllerFactory from "../../core/controller";
import invoiceService from "./invoice.service";


const invoiceController = controllerFactory(invoiceService);

export default invoiceController;