import User from "./user.model"
import bcrypt from 'bcrypt'


export default class UserService {
    static async findAll() {
        return await User.query()
    }

    static async getById(id: number) {
        return await User.query().findById(id)
    }

    static async delete(id: number) {
        return await User.query().deleteById(id)
    }

    static async create(body: any) {
        let data = { ...body }
        let hash = await bcrypt.hash(data.password, Number(process.env.BCRYPT_SALT) || 10)
        return await User.query().insertAndFetch({
            ...data,
            password: hash
        })
    }

    static async update(id: number, body: any) {
        return await User.query().updateAndFetchById(id, body)
    }


} 