import { Knex } from "knex";


const tableName = "clients"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.integer('idCompany')
        table.dropColumn('companyName')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('idCompany')
        table.string('companyName')
    })
}

