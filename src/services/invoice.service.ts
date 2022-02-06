import Invoice from "../models/invoice.model";
import User from "../models/user.model";
import PdfService from "./pdf.service";

export default class InvoiceService {
    static async findAll() {
        return await Invoice.query()
            .withGraphFetched('responsible')
            .withGraphFetched('client')
    }
    static async getById(id: number) {
        return await Invoice.query()
            .findById(id)
            .withGraphFetched('responsible.company')
            .withGraphFetched('client.company')
    }
    static async delete(id: number) {
        return await Invoice.query().deleteById(id)
    }
    static async create(body: any, auth: User) {
        const lastInvoice = await Invoice.query().where('idCompany', auth.idCompany as number).orderBy('id', "desc").first();

        let identifier: string = +(lastInvoice?.identifier || "") + 1 + "";

        return await Invoice.query().upsertGraphAndFetch({
            ...body,
            identifier,
            idCompany: auth.idCompany,
            idResponsible: auth.id,
            status: 'draft'
        }, { relate: true, unrelate: true });

    }
    static async getPdf(id: number, invoice?: Invoice) {
        const invoiceToPrint = invoice || await InvoiceService.getById(id);

        const pdf = await PdfService.generatePDF({
            data: invoiceToPrint,
            inputPath: __dirname + '/../templates/invoice.html',
            returnType: "stream",
        })

        return pdf;
    }

}