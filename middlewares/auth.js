var User = require('../models/user'),
	passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy( 
	function (username, password, cb) {
		User.findByUsername(username, function (err, user) {
			if (!user) return cb(null, false);
			if (err) return cb(err);
			user.checkAuthorized(password, function (err, ok) {
				if (err) return cb(err);
				if (!ok) return cb(null, false);
				return cb(null, user);
			});
		});
	}
));

module.exports = function (req, res, next) {
	passport.authenticate('basic', function (err, user, info) {
		if (err) { 
			return next(err); 
		}

		if (!user) {
			var err = new Error();
			err.http_code = 401;

			// Suppress default browser login prompt if XHR request
			if(req.xhr) {
				res.set('WWW-Authenticate', 'x'+info);
			}

			return next(err);
		}

		req.user = user;
		next();

	})(req, res, next);
}