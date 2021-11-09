
exports.up = function(knex) {
  return knex.schema.createTable('users',(table)=>{
    table.increments("id")
    table.string('username',10).notNullable().unique()
    table.string('password',191).notNullable()
    table.timestamps()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
