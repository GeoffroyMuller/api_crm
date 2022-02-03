import { Request, Response } from "express";
import { IAuthRequest } from "../middlewares/auth.middleware";
import CompanyService from "../services/company.service";

async function findAll(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.findAll())
}

async function getById(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.getById(req.params.id as unknown as number))
}

async function create(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.create(req.body))
}

async function update(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: IAuthRequest, res: Response) {
    res.json(await CompanyService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById
}