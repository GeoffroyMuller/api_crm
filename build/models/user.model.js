"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objection_1 = require("objection");
class User extends objection_1.Model {
    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }
    static get tableName() {
        return 'users';
    }
}
exports.default = User;
