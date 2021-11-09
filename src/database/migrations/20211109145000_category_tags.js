
exports.up = function(knex) {
    return knex.schema.createTable('category_tags',function(table){
        table.increments('id')
        table.integer('id_category').unsigned().notNullable();
        table.integer('id_tag').unsigned().notNullable();
        table.foreign('id_category').references('category.id').withKeyName('fk_fkey_category_tag').onDelete('cascade').onUpdate('cascade');
        table.foreign('id_tag').references('tags.id').withKeyName('fk_fkey_tag_category').onDelete('cascade').onUpdate('cascade');
    })
};

exports.down = function(knex) {
    knex.schema.table('category_tags',table=>{
        table.dropForeign('id_category',['fk_fkey_category_tag'])
        table.dropForeign('id_tag',['fk_fkey_tag_category'])        
    })
    return knex.schema
    .dropTable('category_tags')
};
