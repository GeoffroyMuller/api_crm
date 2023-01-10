import { Knex } from "knex";

const tableName = "product_real_fields"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.integer('idProductReal')
        table.integer('idProductField')
        table.json('value')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}