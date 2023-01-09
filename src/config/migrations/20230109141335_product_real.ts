import { Knex } from "knex";

const tableName = "products_real"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idProduct')
        table.string('reference')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}