
exports.up = function(knex) {
    return knex.schema.createTable('books',(table)=>{
        table.increments("id")
        table.string('book_name',100).notNullable()
        table.string('writer',100).notNullable()
        table.string('publisher',100).notNullable()
        table.date('date_publish').notNullable()
        table.timestamps()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('books')
};
