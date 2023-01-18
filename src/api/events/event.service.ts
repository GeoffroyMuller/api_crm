import serviceFactory from "../../core/service"
import User from "../users/user.model";
import Event from "./event.model";

const eventService = serviceFactory<Event, User>(Event, {
    async onBeforeFetchList({query, auth, filters, data}) {
        if (auth != null) {
            if (auth.idCompany) {
                query.where('events.idCompany', auth.idCompany);
            }
        }
        return {query, auth, filters, data};
    },
    isAuthorized: async (model: Event | Object, user: User) => {
        return Event.fromJson(model)?.idCompany == user?.idCompany;
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

export default eventService;

