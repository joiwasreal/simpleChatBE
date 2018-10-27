exports.seed = async knex => {
  const users = {};
  for (let user of await knex('users').select('id', 'username')) {
    users[user.username] = user.id;
  }
  await knex('contacts').insert([
    {
      user_id: users.bulyshko,
      contact_id: users.uldis
    },
    {
      user_id: users.uldis,
      contact_id: users.bulyshko
    },
    {
      user_id: users.larry,
      contact_id: users.sergey
    },
    {
      user_id: users.sergey,
      contact_id: users.larry
    },
    {
      user_id: users.bulyshko,
      contact_id: users.steve
    },
    {
      user_id: users.bulyshko,
      contact_id: users.jeff
    }
  ])
}
