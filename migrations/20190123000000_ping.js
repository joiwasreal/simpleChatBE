exports.up = async knex => {
  await knex.schema.alterTable('users', table => {
    table.timestamp('seen_at')
  })
}

exports.down = async knex => {
  await knex.schema.alterTable('users', table => {
    table.dropColumn('seen_at')
  })
}
