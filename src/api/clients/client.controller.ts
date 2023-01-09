import { IAuthRequest } from "../auth/auth.middleware";
import ClientService from "./client.service";
import controllerFactory from "../../core/controller";
import { Response } from "express";
import Client from "./client.model";

const clientController = controllerFactory(ClientService, {
    isModelBlocked: async (req: IAuthRequest, res: Response, model: Client) => {
        if (model?.company?.idCompany) {
            return model.company?.idCompany != req.auth?.idCompany;
        }
        const company = await model.$relatedQuery('company').execute();
        return company == null ?  true : company.idCompany != req.auth?.idCompany;
    },
});

export default clientController;