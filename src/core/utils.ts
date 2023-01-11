import { Model, QueryBuilderType } from "objection";

export function defaultHandleFilters<T extends Model>(query: QueryBuilderType<T>, filters: any): QueryBuilderType<T> {
    if (filters?.$eq != null && typeof filters.$eq === 'object') {
        for (const key of Object.keys(filters.$eq)) {
            query.where(key, filters.$eq[key]);
        }
    }
    return query;
}