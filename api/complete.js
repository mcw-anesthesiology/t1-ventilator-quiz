/** @format */

const knex = require('knex');

const knexfile = require('../knexfile.js');
const config = knexfile[process.env.NODE_ENV || 'development'];
const db = knex(config);

module.exports = (req, res) => {
	try {
		db('submissions')
			.insert({
				first_name: req.body.firstName,
				last_name: req.body.lastName,
				email: req.body.email,
				score: req.body.score,
				date: new Date()
			})
			.then(() => {
				res.status(200).end();
			})
			.catch(err => {
				console.error('Error saving submission', err);
				res.status(500).end();
			});
	} catch (err) {
		console.error('Server error', err);
		res.status(500).end();
	}
};
