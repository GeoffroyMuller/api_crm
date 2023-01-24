import { Knex } from "knex";

const tableName = "sales_products_real";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable(tableName, function (table) {
    table.primary(["idSale", "idProductReal"]);
    table.integer("idSale").unsigned().notNullable().references("sales.id");
    table
      .integer("idProductReal")
      .unsigned()
      .notNullable()
      .references("products_real.id");
    table.float("price");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable(tableName);
}
