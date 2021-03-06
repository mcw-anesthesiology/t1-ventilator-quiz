/** @format */

const db = require('./db.js');

const MAX_SCORE = 8;

module.exports = (req, res) => {
	try {
		res.setHeader('Access-Control-Allow-Origin', '*');

		db('submissions')
			.where({
				email: req.query.email,
				score: MAX_SCORE
			})
			.first()
			.then(row => {
				if (row) {
					res.status(200).send(true);
				} else {
					res.status(204).send(false);
				}
			})
			.catch(err => {
				console.error('Error retrieving submission', err);
				res.status(500).send(false);
			});
	} catch (err) {
		console.error('Server error', err);
		res.status(500).send(false);
	}
};
