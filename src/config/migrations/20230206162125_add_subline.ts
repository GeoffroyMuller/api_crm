import { Knex } from "knex";

const tableName = "sale_sublines";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, function (table) {
    table.increments("id");
    table.integer("idSaleLine");
    table.integer("idProductReal");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
