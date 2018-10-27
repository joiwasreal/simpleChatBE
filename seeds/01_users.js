exports.seed = async knex => {
  await knex('users').insert([
    {
      name: 'Romuald Bulyshko',
      username: 'bulyshko',
      password: 'romuald'
    },
    {
      name: 'Uldis Plotins',
      username: 'uldis',
      password: 'plotins'
    },
    {
      name: 'Steve Jobs',
      username: 'steve',
      password: 'jobs'
    },
    {
      name: 'Jeff Bezos',
      username: 'jeff',
      password: 'bezos'
    },
    {
      name: 'Bill Gates',
      username: 'bill',
      password: 'gates'
    },
    {
      name: 'Larry Page',
      username: 'larry',
      password: 'page'
    },
    {
      name: 'Sergey Brin',
      username: 'sergey',
      password: 'brin'
    }
  ])
}
