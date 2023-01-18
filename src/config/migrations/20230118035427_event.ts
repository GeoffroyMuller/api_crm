import { Knex } from "knex";

const tableName = "events";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table.date("dtstamp");
    table.date("dtstart");
    table.date("dtend");
    table.string("summary");
    table.string("description");
    table.string("location");
    table.string("rrule");
    table.string("organizer");
    table.string("attendee");
    table.string("status");
    table.integer('idCompany');
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable(tableName);
}
