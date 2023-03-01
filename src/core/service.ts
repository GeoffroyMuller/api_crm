import {
  Model,
  ModelClass,
  QueryBuilder,
  QueryBuilderType,
  RelationExpression,
} from "objection";
import filtersService from "./services/filters.service";
import { ServiceFactoryOptions, Service, ID } from "./types";

export class AuthError extends Error {
  constructor(msg: string = "") {
    super(msg);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

function applyRelations<T extends Model>(
  query: QueryBuilderType<T>,
  model: ModelClass<T>,
  relations: any
): QueryBuilderType<T> {
  if (Array.isArray(relations)) {
    for (const relation of relations) {
      const relationLevel1 = (relation as string).split('.')[0];
      // @ts-ignore
      // TODO: check deep relation existence too
      if (model.relationMappings[relationLevel1] != null) {
        query.withGraphFetched(relation);
      }
      
    }
  }
  return query;
}

const serviceFactory = <
  T extends Model,
  AuthModel extends Model | unknown = unknown
>(
  model: ModelClass<T>,
  opts?: ServiceFactoryOptions<T, AuthModel>
): Service<T, AuthModel> => {
  const handleFilters = opts?.handleFilters || filtersService.handleFilters;
  const isAuthorized = opts?.isAuthorized || (() => true);

  const onBeforeCreate = opts?.onBeforeCreate || (async (params) => params);
  const onBeforeFetchList =
    opts?.onBeforeFetchList || (async (params) => params);
  const onBeforeUpdate = opts?.onBeforeUpdate || (async (params) => params);
  const onBeforeGetById = opts?.onBeforeGetById || (async (params) => params);
  const onBeforeRemove = opts?.onBeforeRemove || (async (params) => params);

  const onAfterCreate = opts?.onAfterCreate || (async (params) => params);

  async function checkAuthorization(model: T, auth: any) {
    if (!(await isAuthorized(model, auth))) {
      throw new AuthError();
    }
  }

  const getById = async (
    id: ID,
    auth: any,
    relations?: RelationExpression<T>[],
    filters?: any
  ) => {
    const query = applyRelations<T>(model.query(), model, relations);

    const { query: q, filters: f } = await onBeforeGetById({
      query,
      filters,
      auth,
    });
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
    onAfterCreate,
    getById,
    getAll: async (
      relations: RelationExpression<T>[],
      filters: any,
      auth: any
    ) => {
      const query = applyRelations<T>(model.query(), model, relations);
      const { query: q, filters: f } = await onBeforeFetchList({
        query,
        filters,
        auth,
      });
      handleFilters(q, f);
      return q.execute() as Promise<T[]>;
    },
    paginate: async (
      relations: RelationExpression<T>[],
      filters: any,
      auth: any
    ) => {
      const query = applyRelations<T>(model.query(), model, relations);
      const { query: q, filters: f } = await onBeforeFetchList({
        query,
        filters,
        auth,
      });
      q.page(f.page ? f.page - 1 : 0, f.pageSize || 5);
      handleFilters(q, f);
      return q.execute() as Promise<T[]>;
    },

    create: async (item: any, auth: any) => {
      const { data, query } = await onBeforeCreate({
        query: model.query(),
        data: item,
        auth,
      });
      await checkAuthorization(data, auth);
      const res = query.insert(data).execute() as Promise<T>;
      const { data: result } = await onAfterCreate({
        query: model.query(),
        data: res,
        auth,
      });
      return result;
    },
    update: async (body: any, auth: any) => {
      const { data, query } = await onBeforeUpdate({
        query: model.query(),
        data: body,
        auth,
      });
      await getById(data.id, auth);
      return query.updateAndFetchById(data.id, data).execute() as Promise<T>;
    },
    remove: async (id: ID, auth: any) => {
      const { query, data } = await onBeforeRemove({
        query: model.query(),
        data: { id },
        auth,
      });
      await getById(data.id, auth);
      await query.findById(id).delete().execute();
      return;
    },
  };
};

export default serviceFactory;
