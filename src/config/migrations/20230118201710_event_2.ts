import { Knex } from "knex";

const tableName = "events"

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('dtstamp')
        table.dropColumn('dtstart')
        table.dropColumn('dtend')
    });
    await knex.schema.alterTable(tableName, (table) => {
        table.datetime('dtstamp')
        table.datetime('dtstart')
        table.datetime('dtend')
    });
    return;
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(tableName, (table) => {
        table.dropColumn('dtstamp')
        table.dropColumn('dtstart')
        table.dropColumn('dtend')
    });
    await knex.schema.alterTable(tableName, (table) => {
        table.date('dtstamp')
        table.date('dtstart')
        table.date('dtend')
    });
    return;
}

