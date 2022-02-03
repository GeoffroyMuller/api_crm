import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';
import AuthService from '../services/auth.service';


export interface IAuthRequest extends Request {
    auth?: User;
}

export default class AuthMiddleware {

    static async verify(req: IAuthRequest, res: Response, next: NextFunction): Promise<void> {
        const token = req.headers.authorization || req.cookies.token || req.query.token as string;
        const auth = await AuthService.verify(token);
        if (auth) {
            req['auth'] = auth;
            next();
        } else {
            res.cookie('token', '');
            res.status(403).end();
        }
    }
}
/* export default async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization || req.cookies.token || req.query.token as string;
    const auth = await verify(token);
    if (auth) {
        req['auth'] = auth;
        next();
    } else {
        res.cookie('token', '');
        res.status(403).end();
    }
} */