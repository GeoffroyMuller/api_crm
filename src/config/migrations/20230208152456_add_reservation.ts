import { Knex } from "knex";

const tableName = "reservations"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer("idCompany");
        table.integer("idClient");
        table.string('clientName', 255)
        table.text('description')
        table.datetime('dtstart')
        table.datetime('dtend')
        table.datetime('created_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableName);
}

