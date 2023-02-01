import serviceFactory from "../../core/service";
import { Service } from "../../core/types";
import User from "../users/user.model";
import Invoice from "./invoice.model";

export interface IInvoiceService extends Service<Invoice, User> {}

const invoiceService = serviceFactory(Invoice, {
  isAuthorized(model, auth) {
    return Invoice.fromJson(model)?.idCompany == auth?.idCompany;
  },
  async onBeforeFetchList({ query, auth, filters, data }) {
    if (auth != null) {
      if (auth.idCompany) {
        query.where("invoices.idCompany", auth.idCompany);
      }
    }
    return { query, auth, filters, data };
  },
  async onBeforeCreate({ query, auth, filters, data }) {
    if (data.lines?.length) {
      data.lines = data.lines.map((val: any, order: number) => ({
        ...val,
        order,
      }));
    }
    return {
      query,
      auth,
      filters,
      data: {
        ...data,
        idCompany: auth.idCompany,
        idResponsible: auth.id,
      },
    };
  },
  async onBeforeUpdate({ query, auth, filters, data }) {
    if (data.lines?.length) {
      data.lines = data.lines.map((val: any, order: number) => ({
        ...val,
        order,
      }));
    }
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
}) as IInvoiceService;

export default invoiceService;
