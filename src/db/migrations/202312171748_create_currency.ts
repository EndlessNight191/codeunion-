exports.up = function(knex: any) {
  return knex.schema.createTable('currency', function(table: any) {
    table.increments('id');
      table.string('name').notNullable();
      table.decimal('rate').notNullable();
  });
};
  
exports.down = function(knex: any) {
  return knex.schema.dropTable('currency');
};  