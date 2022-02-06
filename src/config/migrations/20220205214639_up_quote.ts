import { Knex } from "knex";


const tableName = "quotes"


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.text('footer') 
        table.text('modalities')  
        table.string('madeAt', 255)
        table.date('madeOn')
        table.string('status')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('footer')
        table.dropColumn('modalities')
        table.dropColumn('madeAt')
        table.dropColumn('madeOn')
        table.dropColumn('status')
    })
}

