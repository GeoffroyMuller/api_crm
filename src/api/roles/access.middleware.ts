import { Response, NextFunction } from "express";
import { AuthRequest } from "../auth/auth.middleware";

export function accessMiddlewareFactory(rights: string | Array<string>) {
  const rightsArray = Array.isArray(rights) ? rights : [rights];

  async function middleware(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    if (req.auth.role == null) {
        next();
    } else {
      const authRights =
        req.auth?.role?.rights != null
          ? JSON.parse(req.auth?.role?.rights)
          : [];
      for (const testedRight of rightsArray) {
        if (!authRights.includes(testedRight)) {
          return res.status(401).end();
        }
      }
      next();
    }
  }
  return middleware;
}
