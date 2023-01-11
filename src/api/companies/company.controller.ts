import { Request, Response } from "express";
import controllerFactory from "../../core/controller";
import { IAuthRequest } from "../auth/auth.middleware";
import User from "../users/user.model";
import CompanyService from "./company.service";

const companyController = controllerFactory(CompanyService);

export default companyController;