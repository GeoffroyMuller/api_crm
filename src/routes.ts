import { Application } from "express";
import AuthController from "./controllers/auth.controller";
import CompanyController from "./controllers/company.controller";
import UserController from "./controllers/user.controller";

export default function Routes(app: Application) {

    app.post('/auth/login', AuthController.login)
    
    app.get('/companies', CompanyController.findAll)
    app.post('/companies', CompanyController.create)
    app.put('/companies/:id', CompanyController.update)
    app.delete('/companies/:id', CompanyController.deleteById)
    app.get('/companies/:id', CompanyController.getById)

    app.get('/users', UserController.findAll)
    app.post('/users', UserController.create)
    app.put('/users/:id', UserController.update)
    app.delete('/users/:id', UserController.deleteById)
    app.get('/users/:id', UserController.getById)

} 