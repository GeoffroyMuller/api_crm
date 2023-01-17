import { Model, ModelClass, QueryBuilderType, RelationExpression } from "objection";
import User from "../api/users/user.model";
import filtersService from "./services/filters.service";

type ID = string | number;

export class AuthError extends Error {
  constructor(msg: string = '') {
      super(msg);
      // Set the prototype explicitly.
      Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export type ServiceLifeCycleActionParams<T extends Model> = {
  query: QueryBuilderType<T>; 
  auth: User;
  data?: any;
  filters?: any;
};

export type ServiceLifeCycleAction<T extends Model> = 
  (params: ServiceLifeCycleActionParams<T>) => Promise<ServiceLifeCycleActionParams<T>>;

export interface Service<T extends Model> {
    getAll: (relations: RelationExpression<T>[], filters: any, auth: User) => Promise<T[]>;
    paginate: (relations: RelationExpression<T>[], filters: any, auth: User) => Promise<T[]>;
    getById:  (id: ID, auth: User, relations?: RelationExpression<T>[], filters?: any) => Promise<T>;
    create: (item: any, auth: User) => Promise<T>;
    update: (item: any, auth: User) => Promise<T>;
    remove:  (id: ID, auth: User) => Promise<void>;
    
    isAuthorized: (model: T, auth: User) => boolean | Promise<boolean>;

    checkAuthorization: (model: T, auth: User) => void;
    onBeforeFetchList: ServiceLifeCycleAction<T>;
    onBeforeGetById: ServiceLifeCycleAction<T>;
    onBeforeCreate: ServiceLifeCycleAction<T>;
    onBeforeUpdate: ServiceLifeCycleAction<T>;
    onBeforeRemove: ServiceLifeCycleAction<T>;
} 
export type ServiceFactoryOptions<T extends Model> = {
  handleFilters?: (query: QueryBuilderType<T>, filters: any) => QueryBuilderType<T>;
  isAuthorized?: (model: T, user: User) => boolean | Promise<boolean>;

  onBeforeFetchList?: ServiceLifeCycleAction<T>;
  onBeforeGetById?: ServiceLifeCycleAction<T>;
  onBeforeCreate?: ServiceLifeCycleAction<T>;
  onBeforeUpdate?: ServiceLifeCycleAction<T>;
  onBeforeRemove?: ServiceLifeCycleAction<T>;
};

const serviceFactory = <T extends Model>(model: ModelClass<T>, opts?: ServiceFactoryOptions<T>): Service<T> => {
  const handleFilters = opts?.handleFilters || filtersService.handleFilters;
  const isAuthorized = opts?.isAuthorized || (() => true);

  const onBeforeCreate = opts?.onBeforeCreate || (async params => params);
  const onBeforeFetchList = opts?.onBeforeFetchList || (async params  => params);
  const onBeforeUpdate = opts?.onBeforeUpdate ||  (async params  => params);
  const onBeforeGetById = opts?.onBeforeGetById || (async params  => params);
  const onBeforeRemove = opts?.onBeforeRemove || (async params  => params);

  async function checkAuthorization(model: T, auth: User) {
    if (!await isAuthorized(model, auth)) {
      throw new AuthError();
    }
  };

  const getById = async (id: ID, auth: User, relations?: RelationExpression<T>[], filters?: any) => {
    const query = model.query();
    if (Array.isArray(relations)) {
      for (const relation of relations) {
        query.withGraphFetched(relation);
      }
    }
    const {query: q, filters: f} = await onBeforeGetById({query, filters, auth});
    handleFilters(q, f);
    const result = await q.findById(id).execute();
    await checkAuthorization(result as T, auth);
    return result as T;
  };

  return {
    isAuthorized,
    checkAuthorization,
    onBeforeCreate,
    onBeforeFetchList,
    onBeforeGetById,
    onBeforeRemove,
    onBeforeUpdate,
    getById,
    getAll: async (relations: RelationExpression<T>[], filters: any, auth: User) => {
      const query = model.query();
      if (Array.isArray(relations)) {
        for (const relation of relations) {
          query.withGraphFetched(relation);
        }
      }
      const {query: q, filters: f} = await onBeforeFetchList({query, filters, auth});
      handleFilters(q, f);
      return q.execute() as Promise<T[]>;
    },
    paginate: async (relations: RelationExpression<T>[], filters: any, auth: User) => {
      const query = model.query();
      if (Array.isArray(relations)) {
        for (const relation of relations) {
          query.withGraphFetched(relation);
        }
      }
      const {query: q, filters: f} = await onBeforeFetchList({query, filters, auth});
      q.page(f.page ? f.page - 1 : 0, f.pageSize || 5);
      handleFilters(q, f);
      return q.execute() as Promise<T[]>;
    },
    
    create: async (item: any, auth: User) => {
      const {data, query} = await onBeforeCreate({query: model.query(), data: item, auth});
      await checkAuthorization(data, auth);
      return query.insert(data).execute() as Promise<T>;
    },
    update: async (body: any, auth: User) => {
      const {data, query} = await onBeforeUpdate({query: model.query(), data: body, auth});
      await getById(data.id, auth);
      return query.updateAndFetchById(data.id, data).execute() as Promise<T>;
    },
    remove: async (id: ID, auth: User) => {
      const {query, data} = await onBeforeRemove({query: model.query(), data: {id}, auth});
      await getById(data.id, auth);
      await query.findById(id).delete().execute();
      return;
    },
  };
};

export default serviceFactory;