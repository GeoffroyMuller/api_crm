import serviceFactory from "../../core/service"
import User from "../users/user.model";
import Client from "./client.model"

const clientService = serviceFactory(Client, {
    isAuthorized: async (model: Client | Object, user: User) => {
        const _model = Client.fromJson(model);
        if (_model?.company?.idCompany) {
            return _model.company?.idCompany == user.idCompany;
        }
        const company = await _model.$relatedQuery('company').execute();
        return company == null ?  false : company.idCompany == user.idCompany;
    },
    listAuthDefaultFilters: (query, user)  => {
        if (user != null) {
            if (user.idCompany) {
                return query
                    .joinRelated('company')
                    .where('company.idCompany', user.idCompany);
            }
        }
        return query;
    }
});

export default clientService;

