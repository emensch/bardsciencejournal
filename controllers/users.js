var express = require('express'),
	router = express.Router(),
	User = require('../models/user');

router.get('/', function (req, res, next) {
	User.findAll( function (err, users) {
		if (err) {
			return next(err);
		}

		res.json(users);
	});
});

router.post('/', function (req, res, next) {
	User.createFromBody(req.body, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(201);
	});
});

router.put('/:username', function (req, res, next) {
	User.updateFromBodyByUsername(req.params.username, req.body, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

router.delete('/:username', function (req, res, next) {
	User.deleteByUsername(req.params.username, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;