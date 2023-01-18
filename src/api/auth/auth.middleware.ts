import { Request, Response, NextFunction } from 'express';
import { IAuthRequest } from '../../core/types';
import User from '../users/user.model';
import AuthService from './auth.service';


export type AuthRequest = IAuthRequest<User>;

export default async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization || req.cookies.token || req.query.token as string;
    const auth = await AuthService.verify(token);
    if (auth) {
        // @ts-ignore
        req['auth'] = auth;
        next();
    } else {
        res.cookie('token', '');
        res.status(401).end();
    }
}
