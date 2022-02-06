import Company from "../models/company.model"
import User from "../models/user.model"

export default class CompanyService {
    static async findAll(auth: User) {
        return await Company.query()
            .where('idCompany', auth?.company?.id || '')
    }

    static async getById(id: number, auth: User) {
        return await Company.query()
            .where('idCompany', auth?.company?.id || '')
            .andWhere('id', id)
            .first()
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