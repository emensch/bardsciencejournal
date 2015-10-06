var express = require('express'),
	router = express.Router(),
	Post = require('../models/post'),
	auth = require('../middlewares/auth');

router.get('/', function (req, res, next) {
	Post.findWithQuery(req.query, function (err, posts) {
		if (err) {
			return next(err);
		}

		res.json(posts);
	});
});

router.get('/:slug', function (req, res, next) {
	Post.findBySlug(req.params.slug, function (err, post) {
		if (err) {
			return next(err);
		}

		res.json(post);
	});
});

router.post('/', auth, function (req, res, next) {
	Post.createFromReq(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(201);
	});
});

router.put('/:slug', auth, function (req, res, next) {
	Post.updateFromReq(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

router.delete('/:slug', auth, function (req, res, next) {
	Post.deleteBySlug(req.params.slug, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;