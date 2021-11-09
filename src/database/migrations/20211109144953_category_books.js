
exports.up = function(knex) {
    return knex.schema.createTable('category_books',function(table){
        table.increments('id')
        table.integer('id_category').unsigned().notNullable();
        table.integer('id_book').unsigned().notNullable();
        table.foreign('id_category').references('category.id').withKeyName('fk_fkey_category').onDelete('cascade').onUpdate('cascade');
        table.foreign('id_book').references('books.id').withKeyName('fk_fkey_books').onDelete('cascade').onUpdate('cascade');
    })
};

exports.down = function(knex) {
    knex.schema.table('category_books',table=>{
        table.dropForeign('id_category',['fk_fkey_category'])
        table.dropForeign('id_book',['fk_fkey_books'])        
    })
    return knex.schema
    .dropTable('category_books')
};
