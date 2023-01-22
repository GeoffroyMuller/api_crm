import { Knex } from "knex";

const tableName = "products";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("isNumeraryStock");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(tableName, (table) => {
    table.boolean("isNumeraryStock");
  });
}
