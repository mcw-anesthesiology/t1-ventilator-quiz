/** @format */

const knex = require('knex');

const { DB_HOST, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env;

const db = knex({
	client: 'mysql',
	connection: {
		host: DB_HOST,
		database: DB_DATABASE,
		user: DB_USER,
		password: DB_PASSWORD
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: 'knex_migrations'
	},
	useNullAsDefault: true
});

module.exports = db;
