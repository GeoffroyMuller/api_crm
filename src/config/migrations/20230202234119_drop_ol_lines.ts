import { Knex } from "knex";


const tableName = "sale_lines"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTable("quote_lines");
    await knex.schema.dropTable("invoice_lines");
}


export async function down(knex: Knex): Promise<void> {
   await knex.schema.createTable("quote_lines", function (table) {
        table.increments('id')
        
        table.integer('idQuote')

        table.integer("idProduct")
        table.integer('idVat')

        table.text('description')
        table.float('qty')
        table.float('unit_price')
        table.float('discount')
        table.string('discount_type') // € ou %
        table.string('type') // title | product | comment | discount
        table.integer('order')
    })
    await knex.schema.createTable("invoice_lines", function (table) {
        table.increments('id')
        
        table.integer('idInvoice')

        table.integer("idProduct")
        table.integer('idVat')

        table.text('description')
        table.float('qty')
        table.float('unit_price')
        table.float('discount')
        table.string('discount_type') // € ou %
        table.string('type') // title | product | comment | discount
        table.integer('order')
    })
}

