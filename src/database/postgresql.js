require('dotenv').config()
const config = {
    client: 'postgresql',
    connection: {
        database: "elibrary",
        user:     "postgres",
        password: "riyanwar65"
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