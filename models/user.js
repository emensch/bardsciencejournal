var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	errors = require('../helpers/modelerrors'),
	bcrypt = require('bcrypt');

var userSchema = new Schema({
	username: { type: String, required: true, unique: true, index: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	date: { type: Date, default: Date.now },
	approved: { type: Boolean, default: false }
});

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

		if(!user) {
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

		if(!user) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, err);
	});
};

userSchema.statics.createFromBody = function (body, cb) {
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

userSchema.statics.updateFromBodyByUsername = function (name, body, cb) {
	this.findOne({ username: name }, function (err, user) {
		if (err) {
			return cb(err);
		}
		user.approved = body.approved;

		user.save( function (err) {
			if (err) {
				errors.parseSaveError(err);
				return cb(err);
			}

			cb();
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