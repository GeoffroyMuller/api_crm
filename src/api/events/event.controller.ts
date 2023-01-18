import controllerFactory from "../../core/controller";
import eventService from "./event.service";

const eventController = controllerFactory(eventService);

export default eventController;