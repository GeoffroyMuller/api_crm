require('dotenv').config();
const Knex = require('knex');
import { Model } from "objection";

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
Model.knex(knex);

export default config;