import { Knex } from "knex";

const tableInvoiceLine = "invoice_lines"
const tableQuoteLine = "quote_lines"
const tableReservationLine = "reservation_lines"

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableInvoiceLine, function (table) {
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
  });
  await knex.schema.createTable(tableQuoteLine, function (table) {
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
  });
  await knex.schema.createTable(tableReservationLine, function (table) {
    table.increments('id')

    table.integer('idReservation')

    table.integer("idProduct")
    table.integer('idVat')

    table.text('description')
    table.float('qty')
    table.float('unit_price')
    table.float('discount')
    table.string('discount_type') // € ou %
    table.string('type') // title | product | comment | discount
    table.integer('order')
  });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableInvoiceLine);
    await knex.schema.dropTable(tableQuoteLine);
    await knex.schema.dropTable(tableReservationLine);
}
