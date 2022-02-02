import { Request, Response } from "express";
import UserService from "../services/user.service";

async function findAll(req: Request, res: Response) {
    res.json(await UserService.findAll())
}

async function getById(req: Request, res: Response) {
    res.json(await UserService.getById(req.params.id as unknown as number))
}

async function create(req: Request, res: Response) {
    res.json(await UserService.create(req.body))
}

async function update(req: Request, res: Response) {
    res.json(await UserService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: Request, res: Response) {
    res.json(await UserService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById
}