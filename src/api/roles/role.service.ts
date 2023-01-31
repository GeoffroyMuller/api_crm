
import serviceFactory from "../../core/service";
import User from "../users/user.model";
import Role from "./role.model";

const roleService = serviceFactory<Role, User>(Role, {
    isAuthorized(model, auth) {
        return Role.fromJson(model)?.idCompany == auth?.idCompany;
    },
    async onBeforeFetchList({ query, auth, filters, data }) {
        if (auth != null) {
          if (auth.idCompany) {
            query.where("roles.idCompany", auth.idCompany);
          }
        }
        return { query, auth, filters, data };
    },
    async onBeforeCreate({ query, auth, filters, data }) {
        return { query, auth, filters, data: {
            ...data,
            idCompany: auth.idCompany,
            rights: Array.isArray(data.rights) ? JSON.stringify(data.rights) : '[]'
        }};
    },
    async onBeforeUpdate({ query, auth, filters, data }) {
        return { query, auth, filters, data: {
            ...data,
            idCompany: auth.idCompany,
            rights: Array.isArray(data.rights) ? JSON.stringify(data.rights) : '[]'
        }};
    }
});


export default roleService;

