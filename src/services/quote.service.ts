import Quote from "../models/quote.model"

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

    static async create(body: any) {
        return await Quote.query().insertAndFetch(body)
    }

    static async update(id: number, body: any) {
        return await Quote.query().updateAndFetchById(id, body)
    }


} 