import { Model, QueryBuilderType } from "objection";

export function defaultHandleFilters<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any
): QueryBuilderType<T> {
  if (filters?.$eq != null && typeof filters.$eq === "object") {
    for (const key of Object.keys(filters.$eq)) {
      const value = filters.$eq[key];
      if (
        value == null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        query.where(`${query.modelClass().tableName}.${key}`, value);
      }
    }
  }
  if (filters?.$contains != null && typeof filters.$contains === "object") {
    for (const key of Object.keys(filters.$contains)) {
      const value = filters.$contains[key];
      if (
        value == null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        query.where(`${query.modelClass().tableName}.${key}`, "like", `%${value}%`);
      }
    }
  }
  return query;
}
