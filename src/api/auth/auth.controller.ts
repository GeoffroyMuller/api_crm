import { Request, Response } from "express";
import AuthService from "./auth.service";

async function login(req: Request, res: Response) {
    try {
        if (typeof req.body.email === 'string' && typeof req.body.password === 'string') {
            res.json(await AuthService.login(req.body.email, req.body.password))
        } else {
            res.status(400).json({message: 'email or password not send'})
        }
    } catch(err) {
        res.status(500).json({ message: err })
    }

}


export default {
    login
}