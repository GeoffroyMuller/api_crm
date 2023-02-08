import { Knex } from "knex";


const tableName = "events"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.integer('idProduct')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('idProduct')
    })
}

