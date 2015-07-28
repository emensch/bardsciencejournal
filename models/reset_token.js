var mongoose = require('mongoose'),
	errors = require('../helpers/modelerrors'),
	bcrypt = require('bcrypt'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var tokenSchema = new Schema({
	username: { type: String, required: true },
	token: { type: String, required: true },
	created: { type: Date, default: Date.now }
});

tokenSchema.index( { created: 1 }, { expireAfterSeconds: 600 });

tokenSchema.statics.generate = function (name, cb) {
	var Token = this;
	crypto.randomBytes(16, function (err, buf) {
		if (err) return cb(err);
		var key = buf.toString('hex');

		bcrypt.genSalt(10, function (err, salt) {
			if (err) return cb(err);

			bcrypt.hash(key, salt, function (err, hash) {
				if (err) return cb(err);

				newToken = new Token({
					username: name,
					token: hash
				});

				var upsertData = newToken.toObject();
				delete upsertData._id;

				Token.update(
					{username: name}, upsertData, { upsert: true }, function (err) {
					if (err) {
						return cb(err);
					}

					cb(null, key);
				});
			});
		});
	});
};

tokenSchema.statics.findByUsername = function (name, cb) {
	var name = name.toLowerCase();
	this.findOne({ username: name })
	.exec( function (err, token) {
		if (err) {
			return cb(err);
		}

		if (!token) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, token);
	});
};

tokenSchema.statics.deleteByUsername = function (name, cb) {
	var name = name.toLowerCase();
	this.findOneAndRemove({ username: name }, function (err, token) {
		if (err) {
			return cb(err);
		}

		if (!token) {
			err = errors.notFound();
			return cb(err);
		}

		cb();
	});
};

tokenSchema.methods.check = function (token, cb) {
	bcrypt.compare(token, this.token, function (err, res) { 
		if (err) return cb(err);
		return cb(null, res);
	});
};

module.exports = mongoose.model('Reset_Token', tokenSchema);