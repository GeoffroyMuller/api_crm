import { Knex } from "knex";

const tableName = "product_real_out"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idCompany')
        table.integer('idProductReal')
        table.integer('idClient')
        table.integer('idReservation')
        table.datetime('dtstart')
        table.datetime('dtend')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

