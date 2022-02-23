import { Knex } from "knex";


const tableName = "invoices"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.float('totalPrice')
        table.dropColumn('status')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('totalPrice')
        table.string('status')
    })
}

