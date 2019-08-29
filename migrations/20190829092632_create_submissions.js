/** @format */

exports.up = knex => {
	return knex.schema.createTable('submissions', table => {
		table.increments('id');
		table.string('first_name');
		table.string('last_name');
		table.string('email');
		table.string('score');
		table.datetime('date').notNullable();
	});
};

exports.down = knex => {
	return knex.schema.dropTableIfExists('submissions');
};
