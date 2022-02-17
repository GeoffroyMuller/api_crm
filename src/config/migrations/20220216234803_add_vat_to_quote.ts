import { Knex } from "knex";


const tableName = "quote_lines"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.integer('idVat')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('idVat')
    })
}

