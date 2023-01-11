import Company from "./company.model"
import User from "../users/user.model"
import serviceFactory from "../../core/service"

const companyService = serviceFactory(Company, {
    listAuthDefaultFilters: (query, user)  => {
        if (user != null) {
            if (user.idCompany) {
                return query.where('idCompany', user.idCompany);
            }
        }
        return query;
    },
    isAuthorized: async (model: Company | Object, user: User) => {
        return Company.fromJson(model)?.idCompany == user?.idCompany;
    },
    forceAuthCreateParams: (item, user) => {
        return {
            ...item,
            idCompany: user?.idCompany
        };
    }
});

export default companyService;