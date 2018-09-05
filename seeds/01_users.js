exports.seed = async knex => {
  await knex('users').truncate()
  await knex('users').insert([
    {
      name: 'Romuald Bulyshko',
      username: 'bulyshko',
      password: 'qwerty'
    },
    {
      name: 'Uldis Plotins',
      username: 'uldis',
      password: 'qwerty'
    }
  ])
}
