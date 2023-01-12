import { Model, QueryBuilderType } from "objection";

function _isFinalValue(value: any) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function _applyQueryFilters<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any,
  operator: string,
  dbOperator: string,
  transformValue: (val: any) => any = (val) => val,
  or?: boolean
): QueryBuilderType<T> {
  if (filters?.[operator] != null && typeof filters?.[operator] === "object") {
    let firstDone = false;
    for (const key of Object.keys(filters[operator])) {
      const value = filters[operator][key];
      if (_isFinalValue(value)) {
        query[firstDone && or ? "orWhere" : "where"](
          `${query.modelClass().tableName}.${key}`,
          dbOperator,
          transformValue(value)
        );
        firstDone = true;
      } else if (Array.isArray(value)) {
        let firstDone2 = false;
        value.forEach((v) => {
          if (_isFinalValue(v)) {
            query[firstDone2 && or ? "orWhere" : "where"](
              `${query.modelClass().tableName}.${key}`,
              dbOperator,
              transformValue(v)
            );
            firstDone2 = true;
          }
        });
      }
    }
  }
  return query;
}

function handleFiltersOr<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any
): QueryBuilderType<T> {
  if (filters?.$or != null && typeof filters.$or === "object") {
    if (typeof filters.$or === "object") {
      query.where((builder) => {
        handleFiltersEq(builder, filters.$or, true);
        handleFiltersContains(builder, filters.$or, true);
        return builder;
      });
    }
  }
  return query;
}

function handleFiltersEq<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any,
  or?: boolean
): QueryBuilderType<T> {
  _applyQueryFilters(query, filters, "$eq", "=", (val) => val, or);
  return query;
}

function handleFiltersContains<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any,
  or?: boolean
): QueryBuilderType<T> {
  _applyQueryFilters(query, filters, "$contains", "like", (val) => `%${val}%`, or);
  return query;
}

function handleFilters<T extends Model>(
  query: QueryBuilderType<T>,
  filters: any
): QueryBuilderType<T> {
  handleFiltersEq(query, filters);
  handleFiltersContains(query, filters);
  handleFiltersOr(query, filters);
  return query;
}

export default {
  handleFilters,
  handleFiltersEq,
  handleFiltersOr,
  handleFiltersContains,
};
