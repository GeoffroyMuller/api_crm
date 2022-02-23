import { Knex } from "knex";


const tableName = "invoice_payments"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idClient')
        table.integer('idInvoice')
        table.float('amount')
        table.timestamp('created_at').defaultTo(knex.fn.now())
    
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

