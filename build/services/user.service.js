"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.query();
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.query().findById(id);
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.query().deleteById(id);
        });
    }
    static create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = Object.assign({}, body);
            let hash = yield bcrypt_1.default.hash(data.password, 10);
            return yield user_model_1.default.query().insertAndFetch(Object.assign(Object.assign({}, data), { password: hash }));
        });
    }
    static update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.query().updateAndFetchById(id, body);
        });
    }
}
exports.default = UserService;
