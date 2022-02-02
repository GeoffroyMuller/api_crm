import { Knex } from "knex";


const tableName = "clients"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable(tableName, function (table) {
        table.increments('id')
        table.string('firstname')
        table.string('lastname')
        table.string('companyName')
        table.string('address')
        table.string('phone')
        table.string('email')
        table.text('description')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}

