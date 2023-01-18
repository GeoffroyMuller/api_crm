import Company from "./company.model"
import User from "../users/user.model"
import serviceFactory from "../../core/service"

const companyService = serviceFactory<Company, User>(Company, {
    async onBeforeFetchList({query, auth, filters, data}) {
        if (auth != null) {
            if (auth.idCompany) {
                query.where('companies.idCompany', auth.idCompany);
            }
        }
        return {query, auth, filters, data};
    },
    isAuthorized: async (model: Company | Object, user: User) => {
        return Company.fromJson(model)?.idCompany == user?.idCompany;
    },
    async onBeforeCreate({query, auth, filters, data}) {
        return {
            query, auth, filters,
            data: {
                ...data,
                idCompany: auth?.idCompany
            }
        };
    },
    
});

export default companyService;