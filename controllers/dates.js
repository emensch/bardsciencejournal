var express = require('express'),
	router = express.Router(),
	Post = require('../models/post');

router.get('/', function (req, res, next) {
	Post.getDates( function (err, dates) {
		if (err) {
			return next(err);
		}

		res.json(dates);
	});
});

module.exports = router;
