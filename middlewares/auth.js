var User = require('../models/user'),
	passport = require('passport'),
	BasicStrategy = require('passport-http').BasicStrategy;

passport.use(new BasicStrategy( 
	function (username, password, cb) {
		User.findByUsername(username, function (err, user) {
			if (err) return cb(err);
			if (!user) return cb(null, false);
			user.cmpPassword(password, function (err, match) {
				if (err) return cb(err);
				if (!match) return cb(null, false);
				return cb(null, user);
			});
		});
	}
));

module.exports = passport.authenticate('basic', { session: false })