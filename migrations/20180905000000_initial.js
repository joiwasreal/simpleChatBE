exports.up = async knex => {
  await knex.schema.createTable('users', table => {
    table.increments('id').primary()
    table.string('name')
    table.string('username').notNullable().unique()
    table.string('password').notNullable()
    table.timestamps(true, true)
  })
  await knex.schema.createTable('contacts', table => {
    table.primary(['user_id', 'contact_id'])
    table.integer('user_id').unsigned()
    table.integer('contact_id').unsigned()
    table.foreign('user_id').references('users.id')
    table.foreign('contact_id').references('users.id')
  })
  await knex.schema.createTable('messages', table => {
    table.increments('id').primary()
    table.string('message').notNullable()
    table.timestamps(true, true)
    table.integer('sender_id').unsigned()
    table.integer('recipient_id').unsigned()
    table.foreign('sender_id').references('users.id')
    table.foreign('recipient_id').references('users.id')
  })
}

exports.down = async knex => {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('contacts')
  await knex.schema.dropTable('messages')
}
