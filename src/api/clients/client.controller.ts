import { IAuthRequest } from "../auth/auth.middleware";
import ClientService from "./client.service";
import controllerFactory from "../../core/controller";
import { Response } from "express";
import Client from "./client.model";

const clientController = controllerFactory(ClientService, {
    isModelBlocked: (req: IAuthRequest, res: Response, model: Client) => {
        return model.idCompany != req.auth?.idCompany;
    }
});

export default clientController;