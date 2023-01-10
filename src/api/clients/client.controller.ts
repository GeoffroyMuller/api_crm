import ClientService from "./client.service";
import controllerFactory from "../../core/controller";

const clientController = controllerFactory(ClientService);

export default clientController;