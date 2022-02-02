import { Request, Response } from "express";
import CompanyService from "../services/company.service";

async function findAll(req: Request, res: Response) {
    res.json(await CompanyService.findAll())
}

async function getById(req: Request, res: Response) {
    res.json(await CompanyService.getById(req.params.id as unknown as number))
}

async function create(req: Request, res: Response) {
    res.json(await CompanyService.create(req.body))
}

async function update(req: Request, res: Response) {
    res.json(await CompanyService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: Request, res: Response) {
    res.json(await CompanyService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById
}