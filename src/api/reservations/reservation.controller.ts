
import controllerFactory from "../../core/controller";
import reservationService from "./reservation.service";

const reservationController = controllerFactory(reservationService);

export default reservationController;
