import { Knex } from "knex";

const tableName = "invoice_lines"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.integer('idProduct')
        table.integer('order')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('idProduct')
        table.dropColumn('order')
    })
}

