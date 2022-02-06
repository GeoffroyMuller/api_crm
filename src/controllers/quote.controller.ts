import { Request, Response } from "express";
import { Stream } from "stream";
import { IAuthRequest } from "../middlewares/auth.middleware";
import User from "../models/user.model";
import QuoteService from "../services/quote.service";

async function findAll(req: IAuthRequest, res: Response) {
    console.log({ req })

    res.json(await QuoteService.findAll())
}

async function getById(req: IAuthRequest, res: Response) {
    res.json(await QuoteService.getById(req.params.id as unknown as number))
}

async function getPdf(req: IAuthRequest, res: Response) {
    const quote = await QuoteService.getById(req.params.id as unknown as number);

    res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-disposition': `attachment; filename=devis_${quote?.identifier}.pdf`,
    });

    const pdf: Stream = await QuoteService.getPdf(req.params.id as unknown as number, quote) as Stream;
    pdf.pipe(res);

}


async function create(req: IAuthRequest, res: Response) {
    res.json(await QuoteService.create(req.body, req.auth as User))
}

async function update(req: IAuthRequest, res: Response) {
    res.json(await QuoteService.update(req.params.id as unknown as number, req.body))
}


async function deleteById(req: IAuthRequest, res: Response) {
    res.json(await QuoteService.delete(req.params.id as unknown as number))
}


export default {
    findAll,
    deleteById,
    update,
    create,
    getById,
    getPdf
}