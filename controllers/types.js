var express = require('express'),
	router = express.Router(),
	Type = require('../models/type');

router.get('/', function (req, res) {
	Type.find({}).select('-_id -__v').exec( function (err, types) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.json(types);
	});
});

router.post('/', function (req, res) {
	Type.createFromBody(req.body, function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.sendStatus(201);
	});
});

router.delete('/:slug', function (req, res) {
	Type.findBySlug(req.params.slug).remove( function (err) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}

		res.sendStatus(200);
	});
});

module.exports = router;