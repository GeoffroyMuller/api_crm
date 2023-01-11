import { Stream } from "stream";
import Quote from "./quote.model"
import User from "../users/user.model";
import PdfService from "../../services/pdf.service";
import mailService from "../../services/mail.service";
import serviceFactory, { Service } from "../../core/service";
const fs = require('fs');
let ejs = require('ejs');


export interface IQuoteService extends Service<Quote> {
    preview: (q: Quote) => Promise<string>;
    sendByMail: (q: Quote) => Promise<any>;
    getPdf: (q: Quote) => Promise<Stream>;
}

const quoteService = serviceFactory<Quote>(Quote, {
    isAuthorized: async (model: Quote | Object, user: User) => {
        return Quote.fromJson(model)?.idCompany == user?.idCompany;
    },
    listAuthDefaultFilters: (query, user)  => {
        if (user != null) {
            if (user.idCompany) {
                return query.where('idCompany', user.idCompany);
            }
        }
        return query;
    },
    forceAuthCreateParams: async (item, user) => {
        const lastQuote = await Quote.query()
            .where('idCompany', user.idCompany as number)
            .orderBy('id', "DESC")
            .first();
        const lastIdentifier: number = lastQuote?.identifier ? +lastQuote?.identifier : 0;
        return {
            ...item,
            idCompany: user.idCompany,
            idResponsible: user.id,
            identifier: lastIdentifier + 1
        };
    }
}) as IQuoteService;

function _mapQuoteDataToDisplay(quote: Quote) {
    return {
        ...quote,
        lines: quote?.lines?.map(line => ({
            ...line,
            vatRate: line?.vat?.rate ? `${line?.vat?.rate }%` : '-'
        })),
    };
}

quoteService.preview = async (quote: Quote) => {
    const html = fs.readFileSync(__dirname + '/../../templates/quote.ejs', 'utf8');
    const htmlReplaced: string = ejs.render(html, _mapQuoteDataToDisplay(quote));
    return htmlReplaced;
}

quoteService.getPdf = async (quote: Quote) => {
    let quoteToPrint = quote;
    const pdf = await PdfService.printPDF({
        data: _mapQuoteDataToDisplay(quoteToPrint),
        inputPath: __dirname + '/../../templates/quote.ejs',
        returnType: "stream",
    });
    return pdf as Stream;
}

quoteService.sendByMail = async (quote: Quote) => {
    try {
        const res = await mailService.sendMail({
            html: ejs.render(fs.readFileSync(__dirname + '/../../templates/quote.ejs', 'utf8'), _mapQuoteDataToDisplay(quote)),
            text: "",
            subject: "Devis",
            to: quote?.client?.email as string
        });
        return res;
    } catch(err) {
        console.error(err);
        return err;
    }
}

export default quoteService;