import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', function (table) {
    table.increments('id');
    table.string('name', 150);
    table.integer('idCompany');
    table.json('rights')
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("roles");
}
