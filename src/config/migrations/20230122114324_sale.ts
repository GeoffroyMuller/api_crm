import { Knex } from "knex";

const tableName = "sales"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idCompany')
        table.integer('idCustomer')
        table.integer('idSeller')
        table.datetime('date')
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

