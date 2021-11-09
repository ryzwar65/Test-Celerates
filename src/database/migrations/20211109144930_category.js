
exports.up = function(knex) {
    return knex.schema.createTable('category',(table)=>{
        table.increments("id")
        table.string('category_name',100).notNullable().unique()
        table.timestamps()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('category')
};
