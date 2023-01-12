import { Knex } from "knex";

const tableName = "products";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(tableName, (table) => {
    table.string("stockManagement");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("stockManagement");
  });
}
