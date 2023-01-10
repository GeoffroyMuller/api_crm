import serviceFactory from "../../core/service"
import Client from "./client.model"

const clientService = serviceFactory(Client, {
    handleFilters: (query, filters) => {
        if (filters != null) {
            if (filters.idCompany) {
                return query
                    .joinRelated('company')
                    .where('company.idCompany', filters.idCompany);
            }
        }
        return query;
    },
    isAuthorized: async (model: Client | Object, user) => {
        const _model = Client.fromJson(model);
        if (_model?.company?.idCompany) {
            return _model.company?.idCompany == user.idCompany;
        }
        const company = await _model.$relatedQuery('company').execute();
        return company == null ?  false : company.idCompany == user.idCompany;
    }
});

export default clientService;

