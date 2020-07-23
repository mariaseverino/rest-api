exports.up = function(knex) {
    return knex.schema.createTable('user', function(table){
        table.string('id').unique()
        table.string('name').notNullable().unique()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('passwordResetToken')
        table.datetime('passwordResetExpires')
        table.datetime('created_at').defaultTo(knex.fn.now())
    })
}

exports.down = function(knex) {
    return knex.schema.dropTable('user');
}