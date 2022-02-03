"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const company_controller_1 = __importDefault(require("./controllers/company.controller"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
function Routes(app) {
    app.get('/companies', company_controller_1.default.findAll);
    app.post('/companies', company_controller_1.default.create);
    app.put('/companies/:id', company_controller_1.default.update);
    app.delete('/companies/:id', company_controller_1.default.deleteById);
    app.get('/companies/:id', company_controller_1.default.getById);
    app.get('/users', user_controller_1.default.findAll);
    app.post('/users', user_controller_1.default.create);
    app.put('/users/:id', user_controller_1.default.update);
    app.delete('/users/:id', user_controller_1.default.deleteById);
    app.get('/users/:id', user_controller_1.default.getById);
}
exports.default = Routes;
