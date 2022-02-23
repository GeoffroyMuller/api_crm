import { Request, Response } from "express";
import { Stream } from "stream";
import { IAuthRequest } from "../middlewares/auth.middleware";
import User from "../models/user.model";
import InvoiceService from "../services/invoice.service";


async function paginate(req: IAuthRequest, res: Response) {
    res.json(await InvoiceService.paginate(req.query, req.auth?.idCompany as number))
}

async function getById(req: IAuthRequest, res: Response) {
    res.json(await InvoiceService.getById(req.params.id as unknown as number))
}

async function getPdf(req: IAuthRequest, res: Response) {
    const invoice = await InvoiceService.getById(req.params.id as unknown as number);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment; filename=facture_${invoice?.identifier}.pdf`,
    });

    const pdf: Stream = await InvoiceService.getPdf(req.params.id as unknown as number, invoice) as Stream;
    pdf.pipe(res);

}

async function create(req: IAuthRequest, res: Response) {
    res.json(await InvoiceService.create(req.body, req.auth as User))
}


async function deleteById(req: IAuthRequest, res: Response) {
    res.json(await InvoiceService.delete(req.params.id as unknown as number))
}

async function preview(req: IAuthRequest, res: Response) {
    console.log({id: req.params.id})
    res.send(await InvoiceService.preview(req.params.id as unknown as number));
}


export default {
    paginate,
    deleteById,
    create,
    getById,
    getPdf,
    preview
}
