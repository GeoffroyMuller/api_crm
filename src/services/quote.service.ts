import Quote from "../models/quote.model"
import User from "../models/user.model";

export default class QuoteService {
    static async findAll() {
        return await Quote.query()
    }

    static async getById(id: number) {
        return await Quote.query().findById(id).withGraphFetched('lines')
    }

    static async delete(id: number) {
        return await Quote.query().deleteById(id)
    }

    static async create(body: any, auth: User) {
        const lastQuote = await Quote.query().where('idCompany', auth.idCompany as number).orderBy('id', "desc").first();

        let identifier: string = +(lastQuote?.identifier || "") + 1 + "";

        return await Quote.query().insertGraphAndFetch({ ...body, identifier, idCompany: auth.idCompany });
    }

    static async update(id: number, body: any) {
        return await Quote.query().updateAndFetchById(id, body)
    }


} 