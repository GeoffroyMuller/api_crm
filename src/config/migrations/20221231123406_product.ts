import { Knex } from "knex";

const tableName = "products"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idCompany')
        table.string('name', 255)
        table.text('description')
        table.float('price')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

