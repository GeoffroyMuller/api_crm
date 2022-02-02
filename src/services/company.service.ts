import Company from "../models/company.model"

export default class CompanyService {
    static async findAll() {
        return await Company.query()
    }

    static async getById(id: number) {
        return await Company.query().findById(id)
    }

    static async delete(id: number) {
        return await Company.query().deleteById(id)
    }

    static async create(body: any) {
        return await Company.query().insertAndFetch(body)
    }

    static async update(id: number, body: any) {
        return await Company.query().updateAndFetchById(id, body)
    }


} 