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
	User.createFromReq(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(201);
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

router.post('/:username/approve', function (req, res, next) {
	User.approveFromReq(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

router.post('/:username/resetpassword', function (req, res, next) {
	User.beginPassReset(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

router.get('/:username/resetpassword/:token', function (req, res, next) {
	User.checkPassReset(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

router.delete('/:username/resetpassword/:token', function (req, res, next) {
	User.finishPassReset(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;