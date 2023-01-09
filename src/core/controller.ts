import { Request, Response } from "express";
import { Model } from "objection";
import { IAuthRequest } from "../api/auth/auth.middleware";
import { Service } from "./service";

type ControllerOptions<T extends Model> = {
  isModelBlocked?: (
    req: IAuthRequest,
    res: Response,
    model: T
  ) => Promise<boolean> | boolean;
  forceQueryParams?: () => void;
};

type ControllerFactory = <T extends Model>(
  service: Service<T>,
  opts?: ControllerOptions<T>
) => {
  [key: string]: (req: Request, res: Response) => Promise<Response>;
};

const controllerFactory: ControllerFactory = (service, opts = undefined) => {
  function _getRelationArray(req: Request): string[] | undefined {
    if (Array.isArray(req.query.populate)) {
      return req.query.populate as string[];
    }
    if (typeof req.query.populate === "string") {
      return [req.query.populate];
    }
    return undefined;
  }

  return {
    getAll: async (req: Request, res: Response) => {
      try {
        const items = await service.getAll(_getRelationArray(req));
        return res.status(200).json(items);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "",
        });
      }
    },
    getById: async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const item = await service.getById(id, _getRelationArray(req));
        if (!item) {
          return res.status(404).json({
            success: 0,
            message: "Item not found",
          });
        }
        if (opts?.isModelBlocked != null) {
          if (await opts.isModelBlocked(req, res, item)) {
            return res.status(401).json({
              success: 0,
              message: "",
            });
          }
        }
        return res.status(200).json(item);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "",
        });
      }
    },
    create: async (req: Request, res: Response) => {
      try {
        const item = req.body;
        const createdItem = await service.create(item);
        return res.status(200).json(createdItem);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "",
        });
      }
    },
    update: async (req: Request, res: Response) => {
      try {
        const item = req.body;
        const updatedItem = await service.update(item);
        if (!updatedItem) {
          return res.status(404).json({
            success: 0,
            message: "Item not found",
          });
        }
        return res.status(200).json(updatedItem);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "",
        });
      }
    },
    delete: async (req: Request, res: Response) => {
      try {
        const id = req.params.id;
        const deletedItem = await service.remove(id);

        return res.status(404).json({
          success: 0,
          message: "Item not found",
        });

        return res.status(200).json(deletedItem);
      } catch (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "",
        });
      }
    },
  };
};

export default controllerFactory;
