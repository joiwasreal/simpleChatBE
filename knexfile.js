const { DATABASE_URL } = process.env
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: 'db.sqlite'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'postgres',
    connection: {
      user: 'postgres',
      database: 'up'
    }
  },
  production: {
    client: 'postgres',
    connection: DATABASE_URL
  }
}
