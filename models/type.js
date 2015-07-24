var mongoose = require('mongoose'),
	slug = require('slug'),
	errors = require('../helpers/modelerrors'),
	Schema = mongoose.Schema;

var typeSchema = new Schema({
	name: { type: String, required: true }, 
	slug: { type: String, required: true }
});

typeSchema.index({ slug: 1 }, { unique: true });

typeSchema.statics.findAll = function (cb) {
	this.find({})
	.select('-_id -__v')
	.exec( function (err, type) {
		if (err) {
			return cb(err);
		}

		cb(null, type);
	});
};

typeSchema.statics.findBySlug = function (slug, cb) {
	this.findOne({ slug: slug })
	.select('-_id -__v')
	.exec( function (err, type) {
		if (err) {
			return cb(err);
		}

		if(!type) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, type);
	});
};

typeSchema.statics.deleteBySlug = function (slug, cb) {
	this.findOneAndRemove({ slug: slug }, function (err, type) {
		if (err) {
			return cb(err);
		}

		if(!type) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, err);
	});
};

typeSchema.statics.createFromBody = function (body, cb) {
	newType = new this({
		name: body.name
	});

	newType.save( function (err) {
		if (err) {
			errors.parseSaveError(err);
			return cb(err);
		}

		cb();
	});
};

typeSchema.pre('validate', function (next) {
	if (!this.isModified('name')) return next();

	if (!this.name) {
		err = errors.badRequest();
		return next(err);
	}

	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Type', typeSchema);