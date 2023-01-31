import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('roles', function (table) {
    table.increments('id');
    table.string('name', 150);
  });
  await knex.schema.createTable('rights', function (table) {
    table.increments('id');
    table.string('name', 150);
  });
  await knex.schema.createTable('roles_rights', function (table) {
    table.integer("idRole").unsigned().notNullable().references("roles.id");
    table.integer("idRight").unsigned().notNullable().references("rights.id");
    table.primary(["idRole", "idRight"]);
  });
  
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("roles");
  await knex.schema.dropTable("rights");
  await knex.schema.dropTable("roles_rights");
}
