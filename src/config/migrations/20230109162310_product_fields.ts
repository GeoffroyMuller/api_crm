import { Knex } from "knex";

const tableName = "product_fields"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idProduct')
        table.string('name')
        table.string('type')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}