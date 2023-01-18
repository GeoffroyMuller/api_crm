import { Request, Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import UserService from "./user.service";

async function findAll(req: AuthRequest, res: Response) {
    res.json(await UserService.findAll())
}

async function getById(req: AuthRequest, res: Response) {
    res.json(await UserService.getById(req.params.id as unknown as number))
}

async function create(req: AuthRequest, res: Response) {
    res.json(await UserService.create(req.body))
}

async function update(req: AuthRequest, res: Response) {
    res.json(await UserService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: AuthRequest, res: Response) {
    res.json(await UserService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById
}