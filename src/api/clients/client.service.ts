import serviceFactory from "../../core/service"
import User from "../users/user.model";
import Client from "./client.model"

const clientService = serviceFactory<Client, User>(Client, {
    isAuthorized: async (model: Client | Object, user: User) => {
        const _model = Client.fromJson(model);
        if (_model?.company?.idCompany) {
            return _model.company?.idCompany == user.idCompany;
        }
        const company = await _model.$relatedQuery('company').execute();
        return company == null ?  false : company.idCompany == user.idCompany;
    },
    async onBeforeFetchList({query, auth, filters, data}) {
        if (auth != null) {
            if (auth.idCompany) {
                query
                    .joinRelated('company')
                    .where('company.idCompany', auth.idCompany);
            }
        }
        return {query, auth, filters, data};
    },
});

export default clientService;

