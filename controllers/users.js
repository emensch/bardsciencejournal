var express = require('express'),
	router = express.Router(),
	User = require('../models/user');

router.get('/', function (req, res, next) {
	User.find({}).select('-_id -__v').exec( function (err, users) {
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

router.delete('/:username', function (req, res, next) {
	User.findByUsername(req.params.username).remove( function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;