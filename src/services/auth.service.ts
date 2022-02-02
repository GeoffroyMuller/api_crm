import User from "../models/user.model";

export default class AuthService {
    static async login(email: string, password: string) {

        try {
            const user = await User.query().where('email', email).first();
            

        } catch(err) {

        }

    }
}