import serviceFactory from "../../core/service";
import { Service } from "../../core/types";
import User from "../users/user.model";
import Invoice from "./invoice.model";

export interface IInvoiceService extends Service<Invoice, User> {

}

const invoiceService = serviceFactory(Invoice, {}) as IInvoiceService;

export default invoiceService;