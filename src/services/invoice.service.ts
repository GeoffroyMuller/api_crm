import { json } from "express";
import Invoice from "../models/invoice.model";
import User from "../models/user.model";
import PdfService from "./pdf.service";
const fs = require('fs');
let ejs = require('ejs');

export default class InvoiceService {


    static async paginate(queryStr: any, idCompany: number) {
        let query = Invoice.query()
            .withGraphFetched('client')
            .withGraphFetched('payments')
            .where('idCompany', idCompany);


           

        if (queryStr.archived) {
            query.where('archived', true)
        } else {
            query.where('archived', false)
                .orWhereNull('archived')
        }

        query.page(queryStr.page ? queryStr.page - 1 : 0, queryStr.pageSize || 5);

        if (queryStr.order && queryStr.orderBy) {
            query.orderBy(queryStr.orderBy, queryStr.order);
        }

        return await query;
    }


    static async getById(id: number) {
        return await Invoice.query()
            .findById(id)
            .withGraphFetched('lines.vat')
            .withGraphFetched('responsible.company')
            .withGraphFetched('client.company')
            .withGraphFetched('payments')
    }

    static async delete(id: number) {
        //return await Invoice.query().deleteById(id)
        return await Invoice.query().updateAndFetchById(id, { archived: true });
    }

    static async create(body: any, auth: User) {
        const lastInvoice = await Invoice.query().where('idCompany', auth.idCompany as number).orderBy('id', "desc").first();

        let identifier: string = +(lastInvoice?.identifier || "") + 1 + "";
        const data = {
            ...body,
            identifier,
            idCompany: auth.idCompany,
            idResponsible: auth.id,

            totalPrice: (body?.lines || []).reduce((prev: number, curr: { unit_price: any; qty: any; }) => {
                return prev + ((curr?.unit_price || 0) * (curr?.qty || 0))
            }, 0)
        };
        const jsonCopy = JSON.stringify(data);
        data.jsonCopy = jsonCopy;

        return await Invoice.query().upsertGraphAndFetch(data, { relate: true, unrelate: true });

    }

    static async preview(id: number) {
        const invoice = await InvoiceService.getById(id);
        const html = fs.readFileSync(__dirname + '/../templates/invoice.html', 'utf8');
        console.log({invoice})
        const htmlReplaced: string = ejs.render(html, JSON.parse(invoice?.jsonCopy || ''));
        return htmlReplaced;
    }

    
    static async getPdf(id: number, invoice?: Invoice) {
        const invoiceToPrint = invoice || await InvoiceService.getById(id);

        const pdf = await PdfService.generatePDF({
            data: JSON.parse(invoiceToPrint?.jsonCopy || ''),
            inputPath: __dirname + '/../templates/invoice.html',
            returnType: "stream",
        })

        return pdf;
    }

}