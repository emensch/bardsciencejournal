var mongoose = require('mongoose'),
	errors = require('../helpers/modelerrors'),
	Schema = mongoose.Schema;

var tokenSchema = new Schema({
	username: { type: String, required: true },
	token: { type: Number, required: true },
	created: { type: Date, default: Date.now }
});

tokenSchema.index( { created: 1 }, { expireAfterSeconds: 600 });

tokenSchema.statics.generate = function (name, cb) {
	var key = Math.floor(Math.random() * 900000) + 100000;

	newToken = new this({
		username: name,
		token: key
	});

	var upsertData = newToken.toObject();
	delete upsertData._id;

	this.update({username: name}, upsertData, { upsert: true }, function (err) {
		if (err) {
			return cb(err);
		}

		cb(null, key);
	});
};

tokenSchema.statics.findByUsername = function (name, cb) {
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

tokenSchema.methods.check = function (token) {
	return (this.token === token);
};

module.exports = mongoose.model('Reset_Token', tokenSchema);