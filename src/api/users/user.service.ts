import User from "./user.model"
import bcrypt from 'bcrypt'
import serviceFactory from "../../core/service"

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
});

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

export default userService;