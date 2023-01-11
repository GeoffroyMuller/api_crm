import { Model, QueryBuilderType } from "objection";

function isFinalValue(value: any) {
  return (
    value == null ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function handleFiltersEq<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any
): QueryBuilderType<T> {
  if (filters?.$eq != null && typeof filters.$eq === "object") {
    for (const key of Object.keys(filters.$eq)) {
      const value = filters.$eq[key];
      if (isFinalValue(value)) {
        query.where(`${query.modelClass().tableName}.${key}`, value);
      }
    }
  }
  return query;
}

function handleFiltersIn<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any
): QueryBuilderType<T> {
  if (filters?.$in != null && typeof filters.$in === "object") {
    for (const key of Object.keys(filters.$in)) {
      const value = filters.$in[key];
      if (isFinalValue(value)) {
        query.whereIn(`${query.modelClass().tableName}.${key}`, value);
      }
    }
  }
  return query;
}

function handleFiltersContains<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any
): QueryBuilderType<T> {
  if (filters?.$contains != null && typeof filters.$contains === "object") {
    for (const key of Object.keys(filters.$contains)) {
      const value = filters.$contains[key];
      if (isFinalValue(value)) {
        query.where(
          `${query.modelClass().tableName}.${key}`,
          "like",
          `%${value}%`
        );
      }
    }
  }
  return query;
}

function handleFilters<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any
): QueryBuilderType<T> {
  handleFiltersEq(query, filters);
  handleFiltersIn(query, filters);
  handleFiltersContains(query, filters);
  return query;
}

export default {
  handleFilters,
  handleFiltersEq,
  handleFiltersIn,
  handleFiltersContains,
};
