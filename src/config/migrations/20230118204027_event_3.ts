import { Knex } from "knex";

const tableName = "events";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("rrule");
    table.dropColumn("organizer");
    table.dropColumn("attendee");
    table.dropColumn("status");
  });
  await knex.schema.alterTable(tableName, (table) => {
    table.string("recurrence_freq");
    table.integer("recurrence_interval");
    table.integer("recurrence_count");
    table.string("recurrence_until");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(tableName, (table) => {
    table.dropColumn("recurrence_freq");
    table.dropColumn("recurrence_interval");
    table.dropColumn("recurrence_count");
    table.dropColumn("recurrence_until");
  });
  await knex.schema.alterTable(tableName, (table) => {
    table.string("rrule");
    table.string("organizer");
    table.string("attendee");
    table.string("status");
  });
}
