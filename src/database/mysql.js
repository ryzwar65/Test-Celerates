require('dotenv').config()
const config = {
    client: 'mysql',
    connection: {
      database: "elibrary",
      user:     "root",
      password: ""
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
}
module.exports = config