
import controllerFactory from "../../core/controller";
import roleService from "./role.service";

const roleController = controllerFactory(roleService);

export default roleController;
