var express = require('express'),
	router = express.Router(),
	User = require('../models/user'),
	auth = require('../middlewares/auth');

router.put('/', auth, function (req, res, next) {
	User.updateCurrentFromReq(req, function (err) {
		if (err) {
			return next(err);
		}

		res.sendStatus(200);
	});
});

module.exports = router;