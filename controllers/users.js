var express = require('express'),
	router = express.Router(),
	User = require('../models/user');

router.get('/', function (req, res) {
	User.find({}, function(err, users) {
		if (err) res.sendStatus(500);

		res.json(users);
	});
});

router.post('/', function (req, res) {
	User.createFromBody(req.body, function (err) {
		if (err) res.sendStatus(500);

		res.sendStatus(201);
	});
});

router.delete('/:id', function (req, res) {
	User.findById(req.params.id).remove( function (err) {
		if (err) res.sendStatus(500);

		res.sendStatus(200);
	});
});

module.exports = router