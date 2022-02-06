import Quote from "../models/quote.model"
import User from "../models/user.model";
import PdfService from "./pdf.service";

export default class QuoteService {
    static async findAll() {
        return await Quote.query()
            .withGraphFetched('responsible')
            .withGraphFetched('client')
    }

    static async getById(id: number) {
        return await Quote.query()
            .findById(id)
            .withGraphFetched('lines')
            .withGraphFetched('responsible.company')
            .withGraphFetched('client.company')
    }

    static async delete(id: number) {
        return await Quote.query().deleteById(id)
    }

    static async create(body: any, auth: User) {
        const lastQuote = await Quote.query().where('idCompany', auth.idCompany as number).orderBy('id', "desc").first();

        let identifier: string = +(lastQuote?.identifier || "") + 1 + "";

        console.log({body})
        return await Quote.query().upsertGraphAndFetch({
            ...body,
            identifier,
            idCompany: auth.idCompany,
            idResponsible: auth.id,
            status: 'draft'
        }, { relate: true });
    }

    static async update(id: number, body: any) {

        let data = { ...body }
        delete data.identifier
        delete data.id
        return await Quote.query().upsertGraphAndFetch({
            id,
            ...data
        }, { relate: true, unrelate: true });
    }


    static async getPdf(id: number, quote?: Quote) {

        const quoteToPrint = quote || await QuoteService.getById(id);

        const pdf = await PdfService.generatePDF({
            data: quoteToPrint,
            inputPath: __dirname + '/../templates/quote.html',
            returnType: "stream",
        })

        return pdf;

    }

} 