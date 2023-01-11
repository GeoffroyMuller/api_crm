import { Stream } from "stream";
import controllerFactory from "../../core/controller";
import QuoteService from "./quote.service"; 

const quoteController = controllerFactory(QuoteService);

quoteController.preview = async (req, res) => {
    const quote = await QuoteService.getById(req.params.id, [
        "client.company", "responsible.company", "lines.vat"
    ]);
    if (await QuoteService.isAuthorized(quote, req.auth)) {
        return res.send(await QuoteService.preview(quote));
    }
    return res.status(401).end();
};

quoteController.getPdf = async (req, res) => {
    const quote = await QuoteService.getById(req.params.id, [
        "client.company", "responsible.company", "lines.vat"
    ]);

    if (!await QuoteService.isAuthorized(quote, req.auth)) {
        return res.status(401).end();
    }

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment; filename=devis_${quote?.identifier}.pdf`,
    });

    const pdf: Stream = await QuoteService.getPdf(quote) as Stream;
    pdf.pipe(res);
    return res;
}

quoteController.sendByMail = async (req, res) => {
    const quote = await QuoteService.getById(req.params.id, [
        "client.company", "responsible.company", "lines.vat"
    ]);

    if (!await QuoteService.isAuthorized(quote, req.auth)) {
        return res.status(401).end();
    }

    return res.json(await QuoteService.sendByMail(quote))
}

export default quoteController;