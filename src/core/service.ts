import { query } from "express";
import { Model, ModelClass, QueryBuilderType, RelationExpression } from "objection";
import User from "../api/users/user.model";

type ID = string | number;

export interface Service<T extends Model> {
    getAll: (relations: RelationExpression<T>[], filters: any, auth: User) => Promise<T[]>;
    paginate: (relations: RelationExpression<T>[], filters: any, auth: User) => Promise<T[]>;
    getById:  (id: ID, relations?: RelationExpression<T>[], filters?: any) => Promise<T>;
    create: (item: any) => Promise<T>;
    update: (item: any) => Promise<T>;
    remove:  (id: ID) => Promise<void>;
    
    isAuthorized: (model: T, filters: any) => boolean | Promise<boolean>;
    forceAuthCreateParams: (item: {[key: string]: any}, user: User) => any;
} 
export type ServiceFactoryOptions<T extends Model> = {
  handleFilters?: (query: QueryBuilderType<T>, filters: any) => QueryBuilderType<T>;
  isAuthorized?: (model: T, user: User) => boolean | Promise<boolean>;
  listAuthDefaultFilters?: (query: QueryBuilderType<T>, user: User) => QueryBuilderType<T>;
  forceAuthCreateParams?: (item: {[key: string]: any}, user: User) => any;
};

const serviceFactory = <T extends Model>(model: ModelClass<T>, opts?: ServiceFactoryOptions<T>): Service<T> => {
  const _handleFilters = opts?.handleFilters || ((query) => query);
  const _listAuthDefaultFilters = opts?.listAuthDefaultFilters || ((query) => query);
  const _isAuthorized = opts?.isAuthorized || (() => true);
  const _forceAuthCreateParams = opts?.forceAuthCreateParams || ((item) => item);

  return {
    getAll: async (relations: RelationExpression<T>[], filters: any, auth: User) => {
      const query = model.query();
      if (Array.isArray(relations)) {
        for (const relation of relations) {
          query.withGraphFetched(relation);
        }
      }
      _handleFilters(query, filters);
      _listAuthDefaultFilters(query, auth);
      return query.execute() as Promise<T[]>;
    },
    paginate: async (relations: RelationExpression<T>[], filters: any, auth: User) => {
      const query = model.query();
      if (Array.isArray(relations)) {
        for (const relation of relations) {
          query.withGraphFetched(relation);
        }
      }
      query.page(filters.page ? filters.page - 1 : 0, filters.pageSize || 5);
      _handleFilters(query, filters);
      _listAuthDefaultFilters(query, auth);
      return query.execute() as Promise<T[]>;
    },
    getById: async (id: ID, relations?: RelationExpression<T>[], filters?: any) => {
      const query = model.query();
      if (Array.isArray(relations)) {
        for (const relation of relations) {
          query.withGraphFetched(relation);
        }
      }
      _handleFilters(query, filters);
      return query.findById(id).execute() as Promise<T>;
    },
    create: async (item: any) => {
      return model.query().insert(item).execute() as Promise<T>;
    },
    update: async (item: any) => {
      return model.query().updateAndFetchById(item.id, item).execute() as Promise<T>;
    },
    remove: async (id: ID) => {
      await model.query().findById(id).delete().execute();
      return;
    },
    isAuthorized: _isAuthorized,
    forceAuthCreateParams: _forceAuthCreateParams
  };
};

export default serviceFactory;