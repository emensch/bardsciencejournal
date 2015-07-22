var express = require('express'),
	router = express.Router(),
	Category = require('../models/category');

router.get('/', function (req, res, next) {
	Category.find({}).select('-_id -__v').exec( function (err, categories) {
		if (err) {
			return next(err);
		}

		res.json(categories);
	});
});

router.post('/', function (req, res, next) {
	Category.createFromBody(req.body, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(201);
	});
});

router.delete('/:slug', function (req, res, next) {
	Category.findBySlug(req.params.slug).remove( function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;
