import { Stream } from "stream";
import controllerFactory from "../../core/controller";
import QuoteService from "./quote.service"; 

const quoteController = controllerFactory(QuoteService);

quoteController.preview = async (req, res) => {
    try {
        const quote = await QuoteService.getById(req.params.id, req.auth, [
            "client.company", "responsible.company", "lines.vat"
        ]);
        return res.send(await QuoteService.preview(quote));
    } catch (err) {
        return quoteController.handleError(req, res, err);
    }
};

quoteController.getPdf = async (req, res) => {
    try {
        const quote = await QuoteService.getById(req.params.id, req.auth, [
            "client.company", "responsible.company", "lines.vat"
        ]);
    
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment; filename=devis_${quote?.identifier}.pdf`,
        });
    
        const pdf: Stream = await QuoteService.getPdf(quote) as Stream;
        pdf.pipe(res);
        return res;
    } catch (err) {
        return quoteController.handleError(req, res, err);
    }
}

quoteController.sendByMail = async (req, res) => {
    try {
        const quote = await QuoteService.getById(req.params.id, req.auth, [
            "client.company", "responsible.company", "lines.vat"
        ]);
        return res.json(await QuoteService.sendByMail(quote))
    } catch (err) {
        return quoteController.handleError(req, res, err);
    }
}

export default quoteController;