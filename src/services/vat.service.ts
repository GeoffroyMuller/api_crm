import Vat from "../models/vat.model"

export default class ClientService {
    static async findAll() {
        return await Vat.query()
    }

    static async delete(id: number) {
        return await Vat.query().deleteById(id)
    }

    static async create(body: any) {
        return await Vat.query().insertAndFetch(body)
    }

    static async update(id: number, body: any) {
        return await Vat.query().updateAndFetchById(id, body)
    }


} 