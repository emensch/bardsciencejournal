var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	errors = require('../helpers/modelerrors'),
	Token = require('./reset_token'),
	bcrypt = require('bcrypt'),
	mailer = require('../helpers/mailer');

var userSchema = new Schema({
	username_id: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now },
	approved: { type: Boolean, default: false }
});

userSchema.index({ username_id: 1 }, { unique: true });
userSchema.index({ email: 1 }, {unique: true });

userSchema.statics.findAll = function (cb) {
	this.find({})
	.select('-_id -__v -password -username_id')
	.exec( function (err, user) {
		if (err) {
			return cb(err);
		}

		cb(null, user);
	});
};

userSchema.statics.findByUsername = function (name, cb) {
	var name = name.toLowerCase();
	this.findOne({ username_id: name })
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
	var name = name.toLowerCase();
	this.findOneAndRemove({ username_id: name }, function (err, user) {
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
	var name = req.user.username.toLowerCase();
	var body = req.body;
	this.findOne({ username_id: name }, function (err, user) {
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
	var name = req.params.username.toLowerCase();
	this.findOne({ username_id: name }, function (err, user) {
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

userSchema.statics.beginPassReset = function (req, cb) {
	var name = req.params.username.toLowerCase();
	this.findOne({ username_id: name, approved: true }, function (err, user) {
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

			mailer.sendResetEmail(user.email, user.username, token, function (err, json) {
				if (err) {
					console.log('Error sending email: ', err)
				}

				console.log(token, ' sent to: ', user.email);
			});
			

			cb();
		});
	});
};

userSchema.statics.checkPassReset = function (req, cb) {
	var name = req.params.username.toLowerCase();
	var token = req.params.token;

	Token.findByUsername(name, function (err, thistoken) {
		if (err) {
			return cb(err);
		}

		if (!thistoken) {
			err = errors.notFound();
			return cb(err);
		}

		thistoken.check(token, function (err, ok) {
			if (err) {
				return cb(err);
			}

			if (!ok) {
				err = errors.notFound()
				return cb(err);
			}

			cb();
		});
	});
}

userSchema.statics.finishPassReset = function (req, cb) {
	var body = req.body;
	var token = req.params.token;

	if (!body.password) {
		err = errors.badRequest();
		return cb(err);
	}

	var name = req.params.username.toLowerCase();
	this.findOne({ username_id: name, approved: true }, function (err, user) {
		if (err) {
			return cb(err);
		}

		if (!user) {
			err = errors.notFound();
			return cb(err);
		}

		Token.findByUsername(user.username, function (err, thistoken) {
			if (err) {
				return cb(err);
			}

			if (!thistoken) {
				err = errors.notFound();
				return cb(err);
			}

			thistoken.check(token, function (err, ok) {
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
	var regex = /^[a-zA-Z0-9_-]{3,16}$/;
	return regex.test(username);
});

// Ensure password length is between 8-64 characters
userSchema.path('password').validate( function (password) {
	return (password.length >= 8 && password.length <= 64);
});

userSchema.pre('validate', function (next) {
	if (!this.isModified('username')) return next();

	if (!this.username) {
		err = errors.badRequest();
		return next(err);
	}

	this.username_id = this.username.toLowerCase();
	next();
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