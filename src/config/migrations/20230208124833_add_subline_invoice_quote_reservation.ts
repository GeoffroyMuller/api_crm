import { Knex } from "knex";

const tableInvoiceSubline = "invoice_subline"
const tableQuoteSubline = "quote_subline"
const tableReservationSubline = "reservation_subline"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableInvoiceSubline, function (table) {
        table.increments("id");
        table.integer("idInvoiceLine");
        table.integer("idProductReal");
      });
      await knex.schema.createTable(tableQuoteSubline, function (table) {
        table.increments("id");
        table.integer("idQuoteLine");
        table.integer("idProductReal");
      });
      await knex.schema.createTable(tableReservationSubline, function (table) {
        table.increments("id");
        table.integer("idReservationLine");
        table.integer("idProductReal");
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(tableInvoiceSubline);
    await knex.schema.dropTable(tableQuoteSubline);
    await knex.schema.dropTable(tableReservationSubline);
}

