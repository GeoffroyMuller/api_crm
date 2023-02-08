import { Knex } from "knex";


const tableName = "clients"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.integer('idClientCompany')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('idClientCompany')
    })
}

