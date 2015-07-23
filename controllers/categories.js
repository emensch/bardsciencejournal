var express = require('express'),
	router = express.Router(),
	Category = require('../models/category');

router.get('/', function (req, res, next) {
	Category.findAll( function (err, categories) {
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
	Category.deleteBySlug(req.params.slug, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;
