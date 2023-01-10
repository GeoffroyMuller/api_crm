import Company from "./company.model"
import User from "../users/user.model"
import { query } from "express"

export default class CompanyService {
    static async findAll(auth: User) {
        return await Company.query()
            .where('idCompany', auth?.company?.id || '')
    }

    static async getById(id: number |string, auth?: User) {
        const query = Company.query();
        if (auth) {
            query
                .where('idCompany', auth?.company?.id || '')
                .andWhere('id', id);
        } else {
            query.where('id', id);
        }
        return await query.first()
    }

    static async delete(id: number, auth: User) {
        const company = await Company.query().findById(id);
        if (company?.idCompany == auth?.company?.id) {
            return await Company.query().deleteById(id)
        } else {
            return undefined
        }
    }

    static async create(body: any, auth: User) {
        return await Company.query().insertAndFetch({
            ...body,
            idCompany: auth?.company?.id || ''
        })
    }

    static async update(id: number, body: any, auth: User) {
        return await Company.query().updateAndFetchById(id, {
            ...body,
            idCompany: auth?.company?.id || ''
        })
    }


} 