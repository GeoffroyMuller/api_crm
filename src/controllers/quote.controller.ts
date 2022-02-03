import { Request, Response } from "express";
import { IAuthRequest } from "../middlewares/auth.middleware";
import QuoteService from "../services/quote.service";

async function findAll(req: IAuthRequest, res: Response) {
    console.log({req})

    res.json(await QuoteService.findAll())
}

async function getById(req: IAuthRequest, res: Response) {
    res.json(await QuoteService.getById(req.params.id as unknown as number))
}

async function create(req: IAuthRequest, res: Response) {
    res.json(await QuoteService.create(req.body))
}

async function update(req: IAuthRequest, res: Response) {
    res.json(await QuoteService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: IAuthRequest, res: Response) {
    res.json(await QuoteService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById
}