import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTable("sales_products_real");
    await knex.schema.dropTable("sales_products");
    await knex.schema.dropTable("sales");
}


export async function down(knex: Knex): Promise<void> {
    // flemme...
}

