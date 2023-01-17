import { Request, Response } from "express";
import { Model } from "objection";
import { IAuthRequest } from "../api/auth/auth.middleware";
import { AuthError, Service } from "./service";

export type ControllerFactoryOptions<T extends Model> = {
};

export type ControllerFactory = <T extends Model>(
  service: Service<T>,
  opts?: ControllerFactoryOptions<T>
) => {
  handleError: ControllerHandleError,
  [key: string]: (req: IAuthRequest, res: Response, ...args: any) => Promise<Response>;
};

export type ControllerHandleError = (req: IAuthRequest, res: Response, err: any) => Promise<Response>;

const controllerFactory: ControllerFactory = (service, opts = undefined) => {

  const handleError: ControllerHandleError = async (req: IAuthRequest, res: Response, err: any) => {
    if (err instanceof AuthError) {
      return res.status(401).end();
    }
    return res.status(500).end();
  };

  function _getRelationArray(req: Request): string[] {
    if (Array.isArray(req.query.populate)) {
      return req.query.populate as string[];
    }
    if (typeof req.query.populate === "string") {
      return [req.query.populate];
    }
    return [];
  }


  return {
    handleError,
    paginate: async (req: IAuthRequest, res: Response) => {
      try {
        const filters = req.query;
        const items = await service.paginate(_getRelationArray(req), filters, req.auth);
        return res.status(200).json(items);
      } catch (err) {
        return handleError(req, res, err);
      }
    },
    getAll: async (req: IAuthRequest, res: Response) => {
      try {
        const filters = req.query;
        const items = await service.getAll(_getRelationArray(req), filters, req.auth);
        return res.status(200).json(items);
      } catch (err) {
        return handleError(req, res, err);
      }
    },
    getById: async (req: IAuthRequest, res: Response) => {
      try {
        const id = req.params.id;
        const item = await service.getById(id, req.auth, _getRelationArray(req));
        if (!item) {
          return res.status(404).json({
            success: 0,
            message: "Item not found",
          });
        }
        return res.status(200).json(item);
      } catch (err) {
        return handleError(req, res, err);
      }
    },
    create: async (req: IAuthRequest, res: Response) => {
      try {
        const item = req.body;
        const createdItem = await service.create(item, req.auth);
        return res.status(200).json(createdItem);
      } catch (err) {
        return handleError(req, res, err);
      }
    },
    update: async (req: IAuthRequest, res: Response) => {
      try {
        const item = {...req.body, id: req.params.id};
        const updatedItem = await service.update(item, req.auth);
        if (!updatedItem) {
          return res.status(500).end();
        }
        return res.status(200).json(updatedItem);
      } catch (err) {
        return handleError(req, res, err);
      }
    },
    delete: async (req: IAuthRequest, res: Response) => {
      try {
        const id = req.params.id;
        let item = await service.getById(req.params.id, req.auth);
        if (!await service.isAuthorized(item, req.auth)) {
          return res.status(401).end();
        }
        if (!item) {
          return res.status(404).json({
            success: 0,
            message: "Item not found",
          });
        }
        const deletedItem = await service.remove(id, req.auth);
        return res.status(200).json(deletedItem);
      } catch (err) {
        return handleError(req, res, err);
      }
    },
  };
};

export default controllerFactory;
