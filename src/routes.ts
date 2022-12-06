import { Application } from "express";
import AuthController from "./controllers/auth.controller";
import ClientController from "./controllers/client.controller";
import CompanyController from "./controllers/company.controller";
import QuoteController from "./controllers/quote.controller";
import UserController from "./controllers/user.controller";
import InvoiceController from "./controllers/invoice.controller";
import authMiddleware from "./middlewares/auth.middleware";
import VatController from "./controllers/vat.controller";

export default function Routes(app: Application) {

    app.post('/auth/login', AuthController.login)
    
    app.get('/companies', authMiddleware, CompanyController.findAll)
    app.post('/companies', authMiddleware, CompanyController.create)
    app.put('/companies/:id', authMiddleware, CompanyController.update)
    app.delete('/companies/:id',authMiddleware,  CompanyController.deleteById)
    app.get('/companies/:id', authMiddleware, CompanyController.getById)
    
    app.get('/quotes', authMiddleware, QuoteController.paginate)
    app.post('/quotes', authMiddleware, QuoteController.create)
    app.put('/quotes/:id', authMiddleware, QuoteController.update)
    app.delete('/quotes/:id',authMiddleware,  QuoteController.deleteById)
    app.get('/quotes/:id', authMiddleware, QuoteController.getById)
    app.get('/quotes/:id/pdf', authMiddleware, QuoteController.getPdf)
    app.get('/quotes/:id/preview', authMiddleware, QuoteController.preview)
    
    app.get('/invoices', authMiddleware, InvoiceController.paginate)
    app.post('/invoices', authMiddleware, InvoiceController.create)
    app.delete('/invoices/:id',authMiddleware,  InvoiceController.deleteById)
    app.get('/invoices/:id', authMiddleware, InvoiceController.getById)
    app.get('/invoices/:id/pdf', authMiddleware, InvoiceController.getPdf)
    app.get('/invoices/:id/preview', authMiddleware, InvoiceController.preview)

    app.get('/users', authMiddleware, UserController.findAll)
    app.post('/users', UserController.create)
    /*
    app.post('/users', UserController.create)
    app.put('/users/:id', UserController.update)
    app.delete('/users/:id', UserController.deleteById)s
    app.get('/users/:id', UserController.getById)
    */

    app.get('/clients', authMiddleware, ClientController.findAll)
    app.post('/clients', authMiddleware, ClientController.create)
    app.put('/clients/:id', authMiddleware, ClientController.update)
    app.delete('/clients/:id',authMiddleware,  ClientController.deleteById)
    app.get('/clients/:id', authMiddleware, ClientController.getById)


    app.get('/vats', authMiddleware, VatController.findAll)
    app.post('/vats', authMiddleware, VatController.create)
    app.put('/vats/:id', authMiddleware, VatController.update)
    app.delete('/vats/:id',authMiddleware,  VatController.deleteById)

} 