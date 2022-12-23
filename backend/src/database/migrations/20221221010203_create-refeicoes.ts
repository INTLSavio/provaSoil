import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('refeicoes', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.text('tipo').notNullable()
        table.text('alimentos').notNullable()
        table.text('data').notNullable()
        table.uuid('user_id')
        table.foreign('user_id')
            .references('users.id')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('refeicoes')
}
