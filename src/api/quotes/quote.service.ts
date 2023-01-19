import { Stream } from "stream";
import Quote from "./quote.model"
import User from "../users/user.model";
import PdfService from "../../core/services/pdf.service";
import mailService from "../../core/services/mail.service";
import serviceFactory from "../../core/service";
import { merge } from "lodash";
import { Service } from "../../core/types";
import QuoteLine from "./quoteline.model";
const fs = require('fs');
let ejs = require('ejs');


export interface IQuoteService extends Service<Quote, User> {
    preview: (q: Quote) => Promise<string>;
    sendByMail: (q: Quote) => Promise<any>;
    getPdf: (q: Quote) => Promise<Stream>;
}

const quoteService = serviceFactory<Quote, User>(Quote, {
    isAuthorized: async (model: Quote | Object, user: User) => {
        return Quote.fromJson(model)?.idCompany == user?.idCompany;
    },
    async onBeforeFetchList({query, auth, filters, data}) {
        if (auth != null) {
            if (auth.idCompany) {
                query.where('quotes.idCompany', auth.idCompany);
            }
        }
        return {query, auth, filters, data};
    },
    async onBeforeUpdate({query, auth, filters, data}) {
        if (data.lines?.length) {
            data.lines = data.lines.map((val: any, order: number) => ({...val, order}))
        }
        return {query, auth, filters, data};
    },
    async onBeforeCreate({query, auth, filters, data}) {
        const lastQuote = await Quote.query()
            .where('idCompany', auth.idCompany as number)
            .orderBy('id', "DESC")
            .first();
        const lastIdentifier: number = lastQuote?.identifier ? +lastQuote?.identifier : 0;
        if (data.lines?.length) {
            data.lines = data.lines.map((val: any, order: number) => ({...val, order}))
        }
        return {
            query, auth, filters,
            data: {
                ...data,
                idCompany: auth.idCompany,
                idResponsible: auth.id,
                identifier: lastIdentifier + 1,
                status: 'draft'
            }
        };
    },
}) as IQuoteService;

quoteService.create = async (body: any, auth) => {
    const {data, query} = await quoteService.onBeforeCreate({query: Quote.query(), data: body, auth});
    await quoteService.checkAuthorization(data, auth);
    return await query.upsertGraphAndFetch({
        ...data,
    }, { relate: true }) as unknown as Quote;
}

quoteService.update = async (body: any, auth) => {
    const {data, query} = await quoteService.onBeforeUpdate({query: Quote.query(), data: body, auth});
    await quoteService.getById(data.id, auth);
    const quote = await query.upsertGraphAndFetch({
        id: data.id,
        ...data,
    }, { relate: true, unrelate: true }) as unknown as Quote;
    return quote;
}

function _mapQuoteDataToDisplay(quote: Quote) {
    return merge(
    {
        ...quote,
        lines: quote?.lines?.map(line => ({
            ...line,
            vatRate: line?.vat?.rate ? `${line?.vat?.rate }%` : '-'
        })) || [],
    },
    {
        client: {
            firstname: "",
            lastname: "",
            company: {name: ""}
        },
        responsible: {
            firstname: "",
            lastname: "",
            company: {name: ""}
        },
        modalities: "",
        footer: "",
    });
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