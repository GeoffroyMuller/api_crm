import { Knex } from "knex";


const tableName = "quotes"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idClient')
        table.integer('idResponsible')
        table.integer('idCompany')
        table.string('identifier', 255)
        table.string('name', 255)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

