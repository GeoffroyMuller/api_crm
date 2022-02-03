import { Application } from "express";
import AuthController from "./controllers/auth.controller";
import CompanyController from "./controllers/company.controller";
import QuoteController from "./controllers/quote.controller";
import UserController from "./controllers/user.controller";
import authMiddleware from "./middlewares/auth.middleware";

export default function Routes(app: Application) {

    app.post('/auth/login', AuthController.login)
    
    app.get('/companies', authMiddleware, CompanyController.findAll)
    app.post('/companies', authMiddleware, CompanyController.create)
    app.put('/companies/:id', authMiddleware, CompanyController.update)
    app.delete('/companies/:id',authMiddleware,  CompanyController.deleteById)
    app.get('/companies/:id', authMiddleware, CompanyController.getById)

    app.get('/quotes', authMiddleware, QuoteController.findAll)
    app.post('/quotes', authMiddleware, QuoteController.create)
    app.put('/quotes/:id', authMiddleware, QuoteController.update)
    app.delete('/quotes/:id',authMiddleware,  QuoteController.deleteById)
    app.get('/quotes/:id', authMiddleware, QuoteController.getById)

    app.get('/users', authMiddleware, UserController.findAll)
    /*
    app.post('/users', UserController.create)
    app.put('/users/:id', UserController.update)
    app.delete('/users/:id', UserController.deleteById)
    app.get('/users/:id', UserController.getById)
    */

} 