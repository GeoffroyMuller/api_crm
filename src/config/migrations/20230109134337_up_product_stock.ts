import { Knex } from "knex";

const tableName = "products"

export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('reference')
        table.float('stock')
        table.boolean('isNumeraryStock')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.string('reference')
        table.dropColumn('stock')
        table.dropColumn('isNumeraryStock')
    })
}

