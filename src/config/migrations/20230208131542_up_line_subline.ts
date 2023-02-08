import { Knex } from "knex";

const tableInvoiceSubline = "invoice_sublines"
const tableQuoteSubline = "quote_sublines"
const tableReservationSubline = "reservation_sublines"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableInvoiceSubline);
    await knex.schema.dropTable(tableQuoteSubline);
    await knex.schema.dropTable(tableReservationSubline);

    await knex.schema.createTable(tableInvoiceSubline, function (table) {
        table.increments("id");
        table.integer("idLine");
        table.integer("idProductReal");
      });
      await knex.schema.createTable(tableQuoteSubline, function (table) {
        table.increments("id");
        table.integer("idLine");
        table.integer("idProductReal");
      });
      await knex.schema.createTable(tableReservationSubline, function (table) {
        table.increments("id");
        table.integer("idLine");
        table.integer("idProductReal");
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableInvoiceSubline);
    await knex.schema.dropTable(tableQuoteSubline);
    await knex.schema.dropTable(tableReservationSubline);
}

