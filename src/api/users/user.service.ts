import User from "./user.model"
import bcrypt from 'bcrypt'
import serviceFactory from "../../core/service"
import { ID, Service } from "../../core/types";
import Company from "../companies/company.model";

interface UserService extends Service<User, User> {
    createCompanyOwner: (body: any, companyBody: any) => Promise<User>;
    deleteCompanyOwner: (user: User) => Promise<void>;
}

const userService = serviceFactory<User, User>(User, {
    isAuthorized(model, auth) {
        return User.fromJson(model)?.idCompany == auth?.idCompany;
    },
    async onBeforeFetchList({ query, auth, filters, data }) {
        if (auth != null) {
          if (auth.idCompany) {
            query.where("users.idCompany", auth.idCompany);
          }
        }
        return { query, auth, filters, data };
    },
    async onBeforeCreate({ query, auth, filters, data }) {
        return { query, auth, filters, data: {
            ...data,
            idCompany: auth.idCompany
        }};
    },
    async onBeforeUpdate({ query, auth, filters, data }) {
        return { query, auth, filters, data: {
            ...data,
            idCompany: auth.idCompany
        }};
    }
}) as UserService;

userService.create = async (body: any, auth) => {
    const { data, query } = await userService.onBeforeCreate({
      query: User.query(),
      data: body,
      auth,
    });
    await userService.checkAuthorization(data, auth);
    const hash = await bcrypt.hash(data.password, Number(process.env.BCRYPT_SALT) || 10)
    return await User.query().insertAndFetch({
        ...data,
        password: hash
    });
};

userService.createCompanyOwner = async (body: any, companyBody: any) => {
    const hash = await bcrypt.hash(body.password, Number(process.env.BCRYPT_SALT) || 10);
    const company = await Company.query().insertAndFetch(companyBody);
    return await User.query().insertAndFetch({
        ...body,
        idCompany: company.id,
        password: hash
    });
};

userService.deleteCompanyOwner = async (user: User) => {
    await User.query().deleteById(user.id as number);
    await Company.query().deleteById(user.idCompany as number);
    return;
}

export default userService;