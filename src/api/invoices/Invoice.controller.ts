import { Stream } from "stream";
import controllerFactory from "../../core/controller";
import invoiceService from "./invoice.service";


const invoiceController = controllerFactory(invoiceService);


invoiceController.preview = async (req, res) => {
    try {
        const invoice = await invoiceService.getById(req.params.id, req.auth, [
            "client.company", "responsible.company", "lines.vat"
        ]);
        return res.send(await invoiceService.preview(invoice));
    } catch (err) {
        return invoiceController.handleError(req, res, err);
    }
};

invoiceController.getPdf = async (req, res) => {
    try {
        const invoice = await invoiceService.getById(req.params.id, req.auth, [
            "client.company", "responsible.company", "lines.vat"
        ]);
    
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-disposition': `attachment; filename=invoice_${invoice?.identifier}.pdf`,
        });
    
        const pdf: Stream = await invoiceService.getPdf(invoice) as Stream;
        pdf.pipe(res);
        return res;
    } catch (err) {
        return invoiceController.handleError(req, res, err);
    }
}

invoiceController.sendByMail = async (req, res) => {
    try {
        const invoice = await invoiceService.getById(req.params.id, req.auth, [
            "client.company", "responsible.company", "lines.vat"
        ]);
        return res.json(await invoiceService.sendByMail(invoice))
    } catch (err) {
        return invoiceController.handleError(req, res, err);
    }
}

invoiceController.getPayments = async (req, res) => {
    try {
        const invoice = await invoiceService.getById(req.params.id, req.auth);
        return res.json(await invoiceService.getPayments(invoice));
    } catch (err) {
        return invoiceController.handleError(req, res, err);
    }
}

invoiceController.addPayment = async (req, res) => {
    try {
        const invoice = await invoiceService.getById(req.params.id, req.auth);
        return res.json(await invoiceService.addPayment(invoice, req.body));
    } catch (err) {
        return invoiceController.handleError(req, res, err);
    }
}


export default invoiceController;