import { Model, QueryBuilderType, raw } from "objection";
import { HandleFiltersFunction } from "./types";

function _isFinalValue(value: any) {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function _transformValue(val: any) {
  if (val === 'true' || val === true) {
    return 1;
  } else if (val === 'false' || val === false) {
    return 0;
  }
  return val;
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
      } else if (typeof value === "object" && !!value) {
        for (const valKey of Object.keys(value)) {
          query.joinRelated(key);
          query[firstDone && or ? "orWhere" : "where"](
            `${key}.${valKey}`,
            dbOperator,
            transformValue(value[valKey])
          );
        }
      }
      firstDone = true;
    }
  }
  return query;
}

const handleFiltersOr: HandleFiltersFunction = (query, filters) => {
  if (filters?.$or != null && typeof filters.$or === "object") {
    if (typeof filters.$or === "object") {
      query.where((builder) => {
        return handleFilters(builder, filters.$or, true);
      });
    }
  }
  return query;
};

const handleFiltersAnd: HandleFiltersFunction = (query, filters) => {
  if (filters?.$and != null && typeof filters.$and === "object") {
    if (typeof filters.$and === "object") {
      query.where((builder) => {
        return handleFilters(builder, filters.$and, false);
      });
    }
  }
  return query;
};

const handleFiltersEq: HandleFiltersFunction = (query, filters, or) => {
  return _applyQueryFilters(query, filters, "$eq", "=", _transformValue, or);
};

const handleFiltersContains: HandleFiltersFunction = (query, filters, or) => {
  
  return _applyQueryFilters(
    query,
    filters,
    "$contains",
    "like",
    (val) => `%${_transformValue(val)}%`,
    or
  );
};

const handleFiltersNe: HandleFiltersFunction = (query, filters, or) => {
  return _applyQueryFilters(query, filters, "$ne", "!=", _transformValue, or);
};

const handleFiltersIn: HandleFiltersFunction = (query, filters, or) => {
  const operator = "$in";
  const dbOperator = "in";

  if (filters?.[operator] != null && typeof filters?.[operator] === "object") {
    let firstDone = false;
    for (const key of Object.keys(filters[operator])) {
      const value = filters[operator][key];
      if (Array.isArray(value)) {
        query[firstDone && or ? "orWhere" : "where"](
          `${query.modelClass().tableName}.${key}`,
          dbOperator,
          raw(`"${value.join('","')}"`)
        );
      } else if (_isFinalValue(value)) {
        query[firstDone && or ? "orWhere" : "where"](
          `${query.modelClass().tableName}.${key}`,
          dbOperator,
          raw(`${_transformValue(value)}`)
        );
      } else {
        for (const valKey of Object.keys(value)) {
          query.joinRelated(key);
          query[firstDone && or ? "orWhere" : "where"](
            `${key}.${valKey}`,
            dbOperator,
            raw(
              Array.isArray(value[valKey]) 
                ? `"${value[valKey].join('","')}"` 
                : `${_transformValue(value[valKey])}`
            )
          );
        }
      }
     
      firstDone = true;
    }
  }
  return query;
};

const handleFilters: HandleFiltersFunction = (query, filters, or) => {
  handleFiltersOr(query, filters);
  handleFiltersAnd(query, filters);
  handleFiltersEq(query, filters, or);
  handleFiltersContains(query, filters, or);
  handleFiltersNe(query, filters, or);
  handleFiltersIn(query, filters, or);
  return query;
};

export default {
  handleFilters,
  handleFiltersOr,
  handleFiltersAnd,
  handleFiltersEq,
  handleFiltersContains,
  handleFiltersNe,
};
