"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const Knex = require('knex');
const objection_1 = require("objection");
const config = {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
        database: process.env.DB_DATABASE || 'crm',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
    }
};
const knex = Knex(config);
// Give the knex instance to objection.
objection_1.Model.knex(knex);
exports.default = config;
