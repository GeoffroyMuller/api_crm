import { Knex } from "knex";

const tableName = "events";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, (table) => {
    table.increments("id");
    table.timestamp("dtstamp");
    table.timestamp("dtstart");
    table.timestamp("dtend");
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
