import { Knex } from "knex";

const tableName = "quote_lines";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.integer("idProduct");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("idProduct");
  });
}
