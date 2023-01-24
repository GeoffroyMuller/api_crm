import { Knex } from "knex";

const tableName = "sales_products";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, function (table) {
    table.integer("idSale").unsigned().notNullable().references("sales.id");
    table.integer("idProduct").unsigned().notNullable().references("products.id");
    table.float("price");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);   
}
