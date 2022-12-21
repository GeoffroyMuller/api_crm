import { Request, Response } from "express";
import { IAuthRequest } from "../auth/auth.middleware";
import User from "../users/user.model";
import CompanyService from "./company.service";

async function findAll(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.findAll(req.auth as User))
}

async function getById(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.getById(req.params.id as unknown as number, req.auth as User))
}

async function create(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.create(req.body, req.auth as User))
}

async function update(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.update(req.params.id as unknown as number, req.body, req.auth as User))
}


async function deleteById(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.delete(req.params.id as unknown as number, req.auth as User))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById
}