import { Knex } from "knex";


const tableName = "sale_lines"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        
        table.integer('idQuote')
        table.integer('idInvoice')
        table.integer('idSale')

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


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

