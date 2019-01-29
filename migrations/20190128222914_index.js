exports.up = async knex => {
  await knex.schema.alterTable('messages', table => {
    table.index(['sender_id', 'recipient_id', 'created_at'], 'max_created_at_idx')
  })
}

exports.down = async knex => {
  await knex.schema.alterTable('messages', table => {
    table.dropIndex('max_created_at_idx')
  })
}
