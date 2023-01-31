import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../auth/auth.middleware';

// todo : a finir 
export function accessMiddlewareFactory(rights: string | Array<string>) {
    const rightsArray = Array.isArray(rights) ? rights : [rights];
    
    async function middleware(req: AuthRequest, res: Response, next: NextFunction) {
        console.log(typeof req.auth.role?.rights)
        const isOK = true;
        if (isOK) {
            next();
        } else {
            res.status(401).end();
        }
    }
    return middleware;
}