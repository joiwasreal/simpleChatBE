exports.seed = async knex => {
  await knex('contacts').truncate()
  await knex('contacts').insert([
    {
      user_id: 1,
      contact_id: 2
    },
    {
      user_id: 2,
      contact_id: 1
    }
  ])
}
