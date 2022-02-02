import { Knex } from "knex";


const tableName = "users"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.integer('idCompany')
        table.string('firstname')
        table.string('lastname')
        table.string('address')
        table.string('phone')
        table.string('email')
        table.string('password', 255)
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

