import serviceFactory, { Service } from "../../core/service";
import Invoice from "./invoice.model";

export interface IInvoiceService extends Service<Invoice> {

}

const invoiceService = serviceFactory(Invoice, {}) as IInvoiceService;

export default invoiceService;