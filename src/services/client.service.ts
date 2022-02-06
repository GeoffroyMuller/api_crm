import Client from "../models/client.model"

export default class ClientService {
    static async findAll() {
        return await Client.query().withGraphFetched('company')
    }

    static async getById(id: number) {
        return await Client.query().findById(id).withGraphFetched('company')
    }

    static async delete(id: number) {
        return await Client.query().deleteById(id)
    }

    static async create(body: any) {
        return await Client.query().insertAndFetch(body)
    }

    static async update(id: number, body: any) {
        return await Client.query().updateAndFetchById(id, body)
    }


} 