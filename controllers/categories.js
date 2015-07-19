var express = require('express'),
	router = express.Router(),
	Category = require('../models/category');

router.get('/', function (req, res) {
	Category.find({}, function(err, categories) {
		if (err) res.sendStatus(500);

		res.json(categories);
	});
});

router.post('/', function (req, res) {
	Category.createFromBody(req.body, function (err) {
		if (err) res.sendStatus(500);

		res.sendStatus(201);
	});
});

router.delete('/:slug', function (req, res) {
	Category.findBySlug(req.params.slug).remove( function (err) {
		if (err) res.sendStatus(500);

		res.sendStatus(200);
	});
});

module.exports = router;
