import controllerFactory from "../../core/controller";
import VatService from "./vat.service";

const vatController = controllerFactory(VatService);

export default vatController;