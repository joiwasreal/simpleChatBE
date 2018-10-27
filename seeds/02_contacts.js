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
    },
    {
      user_id: 6,
      contact_id: 7
    },
    {
      user_id: 7,
      contact_id: 6
    },
    {
      user_id: 1,
      contact_id: 4
    },
    {
      user_id: 1,
      contact_id: 3
    }
  ])
}
