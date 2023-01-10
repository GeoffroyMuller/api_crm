import { Request, Response } from "express";
import { Model } from "objection";
import { IAuthRequest } from "../api/auth/auth.middleware";
import { Service } from "./service";

type ControllerFactoryOptions<T extends Model> = {
};

type ControllerFactory = <T extends Model>(
  service: Service<T>,
  opts?: ControllerFactoryOptions<T>
) => {
  [key: string]: (req: IAuthRequest, res: Response) => Promise<Response>;
};

const controllerFactory: ControllerFactory = (service, opts = undefined) => {

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
    getAll: async (req: IAuthRequest, res: Response) => {
      try {
        const filters = {
          ...(req.params.filters!=null && typeof req.params.filters === 'object' 
            ? req.params.filters 
            : {}
          )
        };
        const items = await service.getAll(_getRelationArray(req), filters, req.auth);
        return res.status(200).json(items);
      } catch (err) {
        console.log(err);
        return res.status(500).end();
      }
    },
    getById: async (req: IAuthRequest, res: Response) => {
      try {
        const id = req.params.id;
        const item = await service.getById(id, _getRelationArray(req));
        if (!item) {
          return res.status(404).json({
            success: 0,
            message: "Item not found",
          });
        }
        if (!await service.isAuthorized(item, req.auth)) {
          return res.status(401).end();
        }
        return res.status(200).json(item);
      } catch (err) {
        console.log(err);
        return res.status(500).end();
      }
    },
    create: async (req: IAuthRequest, res: Response) => {
      try {
        const item = req.body;
        if (!await service.isAuthorized(item, req.auth)) {
          return res.status(401).end();
        }
        const createdItem = await service.create(item);
        return res.status(200).json(createdItem);
      } catch (err) {
        console.log(err);
        return res.status(500).end();
      }
    },
    update: async (req: IAuthRequest, res: Response) => {
      try {
        let item = await service.getById(req.params.id);
        if (item == null) {
          return res.status(404).json({
            success: 0,
            message: "Item not found",
          });
        }
        item = {id: req.params.id, ...req.body};
        if (!await service.isAuthorized(item, req.auth)) {
          return res.status(401).end();
        }
        const updatedItem = await service.update(item);
        if (!updatedItem) {
          return res.status(500).end();
        }
        return res.status(200).json(updatedItem);
      } catch (err) {
        console.log(err);
        return res.status(500).end();
      }
    },
    delete: async (req: IAuthRequest, res: Response) => {
      try {
        const id = req.params.id;
        let item = await service.getById(req.params.id);
        if (!await service.isAuthorized(item, req.auth)) {
          return res.status(401).end();
        }
        if (!item) {
          return res.status(404).json({
            success: 0,
            message: "Item not found",
          });
        }
        const deletedItem = await service.remove(id);
        return res.status(200).json(deletedItem);
      } catch (err) {
        console.log(err);
        return res.status(500).end();
      }
    },
  };
};

export default controllerFactory;
