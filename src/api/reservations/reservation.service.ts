import { isNil } from "lodash";
import serviceFactory from "../../core/service";
import User from "../users/user.model";
import Reservation from "./reservation.model";

const reservationService = serviceFactory<Reservation, User>(Reservation, {
  isAuthorized: async (model: Reservation | Object, user: User) => {
    return Reservation.fromJson(model)?.idCompany == user?.idCompany;
  },
  async onBeforeFetchList({ query, auth, filters, data }) {
    if (auth != null) {
      if (auth.idCompany) {
        query.where("idCompany", auth.idCompany);
      }
    }
    return { query, auth, filters, data };
  },
  async onBeforeCreate({ query, auth, filters, data }) {
    delete data.client;
    return {
      query,
      auth,
      filters,
      data: {
        ...data,
        idCompany: auth.idCompany,
      },
    };
  },
});

reservationService.create = async (body: any, auth) => {
  const { data, query } = await reservationService.onBeforeCreate({
    query: Reservation.query(),
    data: body,
    auth,
  });
  await reservationService.checkAuthorization(data, auth);
  return (await query.upsertGraphAndFetch(
    {
      ...data,
    },
    { relate: true }
  )) as unknown as Reservation;
};

reservationService.update = async (body: any, auth) => {
  const { data, query } = await reservationService.onBeforeUpdate({
    query: Reservation.query(),
    data: body,
    auth,
  });
  await reservationService.getById(data.id, auth);
  return (await query.upsertGraphAndFetch(
    {
      id: data.id,
      ...data,
    },
    { relate: true }
  )) as unknown as Reservation;
};

export default reservationService;
