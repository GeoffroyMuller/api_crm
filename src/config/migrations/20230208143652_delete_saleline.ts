import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTable("sale_lines");
    await knex.schema.dropTable("sale_sublines");
}


export async function down(knex: Knex): Promise<void> {
}

