import controllerFactory from "../../core/controller";
import CompanyService from "./company.service";

const companyController = controllerFactory(CompanyService);

export default companyController;