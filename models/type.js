var mongoose = require('mongoose'),
	slug = require('slug'),
	Schema = mongoose.Schema;

var typeSchema = new Schema({
	name: { type: String, required: true }, 
	slug: { type: String, required: true, unique: true, index: true }
});

typeSchema.statics.findAll = function (cb) {
	this.find({})
	.select('-_id -__v')
	.exec( function (err, type) {
		if (err) {
			cb(err);
		}

		cb(null, type);
	})
};

typeSchema.statics.findBySlug = function (slug, cb) {
	this.findOne({ slug: slug })
	.select('-_id -__v')
	.exec( function (err, type) {
		if (err) {
			cb(err);
		}

		if(!type) {
			var err = new Error();
			err.http_code = 404;
			return cb(err);
		}

		cb(null, type);
	});
};

typeSchema.statics.deleteBySlug = function (slug, cb) {
	this.findOneAndRemove({ slug: slug }, function (err, type) {
		if (err) {
			cb(err);
		}

		if(!type) {
			var err = new Error();
			err.http_code = 404;
			return cb(err);
		}

		cb(null, err);
	})
};

typeSchema.statics.createFromBody = function (body, cb) {
	newType = new this({
		name: body.name
	});

	newType.save( function (err) {
		if (err) {
			if (err.name == 'ValidationError') {
				err.http_code = 400;
			} else if (!err.http_code && err.code == 11000) {
				err.http_code = 409;
			}
			return cb(err);
		}

		cb();
	});
};

typeSchema.pre('validate', function (next) {
	if (!this.isModified('name')) return next();

	if (!this.name) {
		var err = new Error();
		err.http_code = 400;
		return next(err);
	}

	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Type', typeSchema);