import { Request, Response } from "express";
import { IAuthRequest } from "../middlewares/auth.middleware";
import ClientService from "../services/client.service";

async function findAll(req: IAuthRequest, res: Response) {
    res.json(await ClientService.findAll())
}

async function getById(req: IAuthRequest, res: Response) {
    res.json(await ClientService.getById(req.params.id as unknown as number))
}

async function create(req: IAuthRequest, res: Response) {
    res.json(await ClientService.create(req.body))
}

async function update(req: IAuthRequest, res: Response) {
    res.json(await ClientService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: IAuthRequest, res: Response) {
    res.json(await ClientService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById
}