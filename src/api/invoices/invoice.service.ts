import { Stream } from "stream";
import serviceFactory from "../../core/service";
import { Service } from "../../core/types";
import User from "../users/user.model";
import Invoice from "./invoice.model";
import { merge } from "lodash";
import PdfService from "../../core/services/pdf.service";
import mailService from "../../core/services/mail.service";
import { raw } from "objection";
const fs = require("fs");
let ejs = require("ejs");

export interface IInvoiceService extends Service<Invoice, User> {
  preview: (q: Invoice) => Promise<string>;
  sendByMail: (q: Invoice) => Promise<any>;
  getPdf: (q: Invoice) => Promise<Stream>;
}

async function getNextIdentifier(auth: User) {
  const last = await Invoice.query()
    .where("idCompany", auth.idCompany as number)
    .orderBy("id", "DESC")
    .first();
  const lastIdentifier: number = last?.identifier ? +last?.identifier : 0;

  return lastIdentifier + 1;
}

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
        identifier: await getNextIdentifier(auth)
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

invoiceService.create = async (body: any, auth) => {
  const { data, query } = await invoiceService.onBeforeCreate({
    query: Invoice.query(),
    data: body,
    auth,
  });
  await invoiceService.checkAuthorization(data, auth);
  return (await query.upsertGraphAndFetch(
    {
      ...data,
    },
    { relate: true }
  )) as unknown as Invoice;
};

invoiceService.update = async (body: any, auth) => {
  const { data, query } = await invoiceService.onBeforeUpdate({
    query: Invoice.query(),
    data: body,
    auth,
  });
  await invoiceService.getById(data.id, auth);
  const quote = (await query.upsertGraphAndFetch(
    {
      id: data.id,
      ...data,
    },
    { relate: true }
  )) as unknown as Invoice;
  return quote;
};

function _mapDataToDisplay(invoice: Invoice) {
  return merge(
    {
      ...invoice,
      lines:
        invoice?.lines?.map((line) => ({
          ...line,
          vatRate: line?.vat?.rate ? `${line?.vat?.rate}%` : "-",
        })) || [],
    },
    {
      client: {
        firstname: "",
        lastname: "",
        company: { name: "" },
      },
      responsible: {
        firstname: "",
        lastname: "",
        company: { name: "" },
      },
      modalities: "",
      footer: "",
    }
  );
}

invoiceService.preview = async (quote: Invoice) => {
  const html = fs.readFileSync(
    __dirname + "/../../templates/quote.ejs",
    "utf8"
  );
  const htmlReplaced: string = ejs.render(html, _mapDataToDisplay(quote));
  return htmlReplaced;
};

invoiceService.getPdf = async (quote: Invoice) => {
  let quoteToPrint = quote;
  const pdf = await PdfService.printPDF({
    data: _mapDataToDisplay(quoteToPrint),
    inputPath: __dirname + "/../../templates/invoice.ejs",
    returnType: "stream",
  });
  return pdf as Stream;
};

invoiceService.sendByMail = async (quote: Invoice) => {
  try {
    const res = await mailService.sendMail({
      html: ejs.render(
        fs.readFileSync(__dirname + "/../../templates/invoice.ejs", "utf8"),
        _mapDataToDisplay(quote)
      ),
      text: "",
      subject: "Devis",
      to: quote?.client?.email as string,
    });
    return res;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export default invoiceService;
