import User from "../users/user.model";
import { Request, Response } from "express";
import { AuthRequest } from "../auth/auth.middleware";
import ProductService from "./product.service";

async function findAll(req: AuthRequest, res: Response) {
  res.json(
    await ProductService.findAll((req.auth as User)?.company?.id as number)
  );
}
async function paginate(req: AuthRequest, res: Response) {
  res.json(
    await ProductService.paginate(req.query, req.auth?.idCompany as number)
  );
}
async function getById(req: AuthRequest, res: Response) {
  res.json(await ProductService.getById(req.params.id as unknown as number));
}

async function create(req: AuthRequest, res: Response) {
  res.json(await ProductService.create(req.body, req.auth as User));
}

async function update(req: AuthRequest, res: Response) {
  res.json(
    await ProductService.update(
      req.params.id as unknown as number,
      req.body,
      req.auth as User
    )
  );
}

async function deleteById(req: AuthRequest, res: Response) {
  res.json(
    await ProductService.deleteById(
      req.params.id as unknown as number,
      req.auth as User
    )
  );
}

export default {
  findAll,
  paginate,
  deleteById,
  update,
  create,
  getById,
};
