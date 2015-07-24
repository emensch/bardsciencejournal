var User = require('../models/user'),
	passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy( 
	function (username, password, cb) {
		User.findByUsername(username, function (err, user) {
			if (err) {
				// Prevent 404 from being returned if user is nonexistent
				err.http_code = 401;
				return cb(err);
			}
			if (!user) return cb(null, false);
			user.checkAuthorized(password, function (err, ok) {
				if (err) return cb(err);
				if (!ok) return cb(null, false);
				return cb(null, user);
			});
		});
	}
));

module.exports = passport.authenticate('basic', { session: false });