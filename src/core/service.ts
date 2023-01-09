import { Model, ModelClass, RelationExpression } from "objection";

type ID = string | number;

export interface Service<T extends Model> {
    getAll: (relations?: RelationExpression<T>[]) => Promise<T[]>;
    getById:  (id: ID, relations?: RelationExpression<T>[]) => Promise<T>;
    create: (item: any) => Promise<T>;
    update: (item: any) => Promise<T>;
    remove:  (id: ID) => Promise<void>;
    [key: string]: (...args: any) => any;
} 

const serviceFactory = <T extends Model>(model: ModelClass<T>): Service<T> => {
  return {
    getAll: async (relations?: RelationExpression<T>[]) => {
      const query = model.query();
      if (Array.isArray(relations)) {
        for (const relation of relations) {
          query.withGraphFetched(relation);
        }
      }
      return query.execute() as Promise<T[]>;
    },
    getById: async (id: ID, relations?: RelationExpression<T>[]) => {
      const query = model.query();
      if (Array.isArray(relations)) {
        for (const relation of relations) {
          query.withGraphFetched(relation);
        }
      }
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
    }
  };
};

export default serviceFactory;