import { Request, Response } from "express";
import { IAuthRequest } from "../middlewares/auth.middleware";
import VatService from "../services/vat.service";

async function findAll(req: IAuthRequest, res: Response) {
    res.json(await VatService.findAll())
}

async function create(req: IAuthRequest, res: Response) {
    res.json(await VatService.create(req.body))
}

async function update(req: IAuthRequest, res: Response) {
    res.json(await VatService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: IAuthRequest, res: Response) {
    res.json(await VatService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
}