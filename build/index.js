"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
// parse application/json
app.use(body_parser_1.default.json());
(0, routes_1.default)(app);
app.listen(3000, () => {
    console.log('The application is listening on port 3000!');
});
