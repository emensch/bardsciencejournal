var express = require('express'),
	router = express.Router(),
	User = require('../models/user');

router.get('/', function (req, res) {
	User.find({}).select('-_id -__v').exec( function (err, users) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.json(users);
	});
});

router.post('/', function (req, res) {
	User.createFromBody(req.body, function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.sendStatus(201);
	});
});

router.delete('/:username', function (req, res) {
	User.findByUsername(req.params.username).remove( function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.sendStatus(200);
	});
});

module.exports = router;