var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	errors = require('../helpers/modelerrors'),
	Token = require('./reset_token'),
	bcrypt = require('bcrypt');

var userSchema = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now },
	approved: { type: Boolean, default: false }
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, {unique: true });

userSchema.statics.findAll = function (cb) {
	this.find({})
	.select('-_id -__v -password')
	.exec( function (err, user) {
		if (err) {
			return cb(err);
		}

		cb(null, user);
	});
};

userSchema.statics.findByUsername = function (name, cb) {
	this.findOne({ username: name })
	.select('-_id -__v')
	.exec( function (err, user) {
		if (err) {
			return cb(err);
		}

		if (!user) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, user);
	});
};

userSchema.statics.deleteByUsername = function (name, cb) {
	this.findOneAndRemove({ username: name }, function (err, user) {
		if (err) {
			return cb(err);
		}

		if (!user) {
			err = errors.notFound();
			return cb(err);
		}

		cb();
	});
};

userSchema.statics.createFromReq = function (req, cb) {
	var body = req.body;
	newUser = new this({
		username: body.username,
		email: body.email,
		password: body.password
	});

	newUser.save( function (err) {
		if (err) {
			errors.parseSaveError(err);
			return cb(err);
		}

		cb();
	});
};

userSchema.statics.updateCurrentFromReq = function (req, cb) {
	var name = req.user.username;
	var body = req.body;
	this.findOne({ username: name }, function (err, user) {
		if (err) {
			return cb(err);
		}

		if (!user) {
			err = errors.notFound();
			return cb(err);
		}

		user.email = body.email || user.email;
		user.password = body.password || user.password;

		user.save( function (err) {
			if (err) {
				errors.parseSaveError(err);
				return cb(err);
			}

			cb();
		});
	});
};

userSchema.statics.approveFromReq = function (req, cb) {
	var name = req.params.username;
	this.findOne({ username: name }, function (err, user) {
		if (err) {
			return cb(err);
		}

		if (!user) {
			err = errors.notFound();
			return cb(err);
		}

		user.approved = true;

		user.save( function (err) {
			if (err) {
				errors.parseSaveError(err);
				return cb(err);
			}

			cb();
		});
	});
};

userSchema.statics.beginPassReset = function (name, cb) {
	this.findOne({ username: name, approved: true }, function (err, user) {
		if (err) {
			return cb(err);
		}

		if (!user) {
			err = errors.notFound();
			return cb(err);
		}

		Token.generate(name, function (err, token) {
			if (err) {
				return cb(err);
			}

			// TODO Email token to user
			console.log(token, ' sent to: ', user.email);

			cb();
		});
	});
};

userSchema.statics.finishPassReset = function (name, body, cb) {
	if (!body.token || !body.password) {
		err = errors.badRequest();
		return cb(err);
	}

	this.findOne({ username: name, approved: true }, function (err, user) {
		if (err) {
			return cb(err);
		}

		if (!user) {
			err = errors.notFound();
			return cb(err);
		}

		Token.findByUsername(user.username, function (err, token) {
			if (err) {
				return cb(err);
			}

			if (!token) {
				err = errors.notFound();
				return cb(err);
			}

			token.check(body.token, function (err, ok) {
				if (err) {
					return cb(err);
				}

				if (!ok) {
					err = errors.notAuthorized();
					return cb(err);
				}

				user.password = body.password;

				Token.deleteByUsername(user.username, function (err) {
					if (err) {
						return cb(err);
					}
				});

				user.save( function (err) {
					if (err) {
						errors.parseSaveError(err);
						return cb(err);
					}

					cb();
				});
			});
		});
	});
};

userSchema.methods.checkAuthorized = function (pw, cb) {
	if (this.approved) {
		bcrypt.compare(pw, this.password, function (err, res) { 
			if (err) return cb(err);
			return cb(null, res);
		});
	} else {
		cb(null, false);
	}
};

// Ensure valid email address
userSchema.path('email').validate( function (email) {
	var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
	return regex.test(email);
});

// Ensure username is 3-16 alphanumeric chars/dashes/underscores
userSchema.path('username').validate( function (username) {
	var regex = /^[a-z0-9_-]{3,16}$/;
	return regex.test(username);
});

// Ensure password length is between 8-64 characters
userSchema.path('password').validate( function (password) {
	return (password.length >= 8 && password.length <= 64);
});


// Password hashing middleware
userSchema.pre('save', function (next) { 
	// Only hash if password has been modified
	var user = this;
	if (!user.isModified('password')) return next();

	bcrypt.genSalt(10, function (err, salt) {
		if (err) return next(err);

		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);

			user.password = hash;
			next();
		});
	});
});

module.exports = mongoose.model('User', userSchema);