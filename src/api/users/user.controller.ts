import controllerFactory from "../../core/controller";
import userService from "./user.service";

const userController = controllerFactory(userService);

export default userController;