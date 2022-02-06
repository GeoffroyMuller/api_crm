import { Knex } from "knex";


const tableName = "invoices"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idClient')
        table.integer('idResponsible')
        table.integer('idCompany')
        table.string('identifier', 255)
        table.text('jsonCopy')
        table.string('name', 255)
        table.text('modalities') 
        table.text('footer')  
        table.string('madeAt', 255)
        table.date('madeOn')
        table.string('status')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}