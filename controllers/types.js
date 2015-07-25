var express = require('express'),
	router = express.Router(),
	Type = require('../models/type');

router.get('/', function (req, res, next) {
	Type.findAll( function (err, types) {
		if (err) {
			return next(err);
		}

		res.json(types);
	});
});

router.post('/', function (req, res, next) {
	Type.createFromReq(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(201);
	});
});

router.delete('/:slug', function (req, res, next) {
	Type.deleteBySlug(req.params.slug, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;