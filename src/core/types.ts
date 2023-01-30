import { Request, Response } from "express";
import { Model, QueryBuilderType, RelationExpression } from "objection";

export type ID = string | number;

export type ServiceLifeCycleActionParams<
  T extends Model,
  AuthModel extends Model | unknown = unknown
> = {
  query: QueryBuilderType<T>;
  auth: AuthModel;
  data?: any;
  filters?: any;
};

export type ServiceLifeCycleAction<
  T extends Model,
  AuthModel extends Model | unknown = unknown
> = (
  params: ServiceLifeCycleActionParams<T, AuthModel>
) => Promise<ServiceLifeCycleActionParams<T>>;

export interface Service<
  T extends Model,
  AuthModel extends Model | unknown = unknown
> {
  getAll: (
    relations: RelationExpression<T>[],
    filters: any,
    auth: any
  ) => Promise<T[]>;
  paginate: (
    relations: RelationExpression<T>[],
    filters: any,
    auth: any
  ) => Promise<T[]>;
  getById: (
    id: ID,
    auth: AuthModel,
    relations?: RelationExpression<T>[],
    filters?: any
  ) => Promise<T>;
  create: (item: any, auth: AuthModel) => Promise<T>;
  update: (item: any, auth: AuthModel) => Promise<T>;
  remove: (id: ID, auth: AuthModel) => Promise<void>;

  isAuthorized: (model: T, auth: AuthModel) => boolean | Promise<boolean>;

  checkAuthorization: (model: T, auth: AuthModel) => void;
  onBeforeFetchList: ServiceLifeCycleAction<T, AuthModel>;
  onBeforeGetById: ServiceLifeCycleAction<T, AuthModel>;
  onBeforeCreate: ServiceLifeCycleAction<T, AuthModel>;
  onBeforeUpdate: ServiceLifeCycleAction<T, AuthModel>;
  onBeforeRemove: ServiceLifeCycleAction<T, AuthModel>;
  onAfterCreate: ServiceLifeCycleAction<T, AuthModel>;
}
export type ServiceFactoryOptions<
  T extends Model,
  AuthModel extends Model | unknown = unknown
> = {
  handleFilters?: (
    query: QueryBuilderType<T>,
    filters: any
  ) => QueryBuilderType<T>;
  isAuthorized?: (model: T, auth: AuthModel) => boolean | Promise<boolean>;

  onBeforeFetchList?: ServiceLifeCycleAction<T, AuthModel>;
  onBeforeGetById?: ServiceLifeCycleAction<T, AuthModel>;
  onBeforeCreate?: ServiceLifeCycleAction<T, AuthModel>;
  onBeforeUpdate?: ServiceLifeCycleAction<T, AuthModel>;
  onBeforeRemove?: ServiceLifeCycleAction<T, AuthModel>;
  onAfterCreate?: ServiceLifeCycleAction<T, AuthModel>;
};

export interface IAuthRequest<T> extends Request {
  auth: T;
}

export type ControllerFactoryOptions<
  T extends Model,
  AuthModel extends Model | unknown = unknown
> = {
  handleError?: ControllerHandleError<T, AuthModel>;
};

export type ControllerFactory = <
  T extends Model,
  AuthModel extends Model | unknown = unknown
>(
  service: Service<T, AuthModel>,
  opts?: ControllerFactoryOptions<T, AuthModel>
) => {
  handleError: ControllerHandleError<T, AuthModel>;
  paginate: (req: IAuthRequest<AuthModel>, res: Response) => Promise<Response>;
  getAll: (req: IAuthRequest<AuthModel>, res: Response) => Promise<Response>;
  getById: (req: IAuthRequest<AuthModel>, res: Response) => Promise<Response>;
  create: (req: IAuthRequest<AuthModel>, res: Response) => Promise<Response>;
  update: (req: IAuthRequest<AuthModel>, res: Response) => Promise<Response>;
  delete: (req: IAuthRequest<AuthModel>, res: Response) => Promise<Response>;

  [key: string]: (
    req: IAuthRequest<AuthModel>,
    res: Response,
    ...args: any
  ) => Promise<Response>;
};

export type ControllerHandleError<
  T,
  AuthModel extends Model | unknown = unknown
> = (
  req: IAuthRequest<AuthModel>,
  res: Response,
  err: any
) => Promise<Response>;
