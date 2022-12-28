const Knex = require('knex');
import { Model } from "objection";
require('dotenv').config({path: __dirname + "/../../.env"});

const config = {
    client: 'mysql2',
    useNullAsDefault: true,
    connection: {
        database: process.env.DB_DATABASE,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
    }
};

const knex = Knex(config);

// Give the knex instance to objection.
Model.knex(knex);

export default config;