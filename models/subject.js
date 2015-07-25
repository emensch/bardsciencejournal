var mongoose = require('mongoose'),
	slug = require('slug'),
	errors = require('../helpers/modelerrors'),
	Schema = mongoose.Schema;

var subjectSchema = new Schema({
	name: { type: String, required: true }, 
	slug: { type: String, required: true }
});

subjectSchema.index({ slug: 1 }, { unique: true });

subjectSchema.statics.findAll = function (cb) {
	this.find({})
	.select('-_id -__v')
	.exec( function (err, subject) {
		if (err) {
			return cb(err);
		}

		cb(null, subject);
	});
};

subjectSchema.statics.findBySlug = function (slug, cb) {
	this.findOne({ slug: slug })
	.select('-_id -__v')
	.exec( function (err, subject) {
		if (err) {
			return cb(err);
		}

		if(!subject) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, subject);
	});
};

subjectSchema.statics.deleteBySlug = function (slug, cb) {
	this.findOneAndRemove({ slug: slug }, function (err, subject) {
		if (err) {
			return cb(err);
		}

		if(!subject) {
			err = errors.notFound();
			return cb(err);
		}

		cb(null, err);
	});
};

subjectSchema.statics.createFromReq = function (req, cb) {
	var body = req.body;
	newSubject = new this({
		name: body.name
	});

	newSubject.save( function (err) {
		if (err) {
			errors.parseSaveError(err);
			return cb(err);
		}

		cb();
	});
};

subjectSchema.pre('validate', function (next) {
	if (!this.isModified('name')) return next();

	if (!this.name) {
		err = errors.badRequest();
		return next(err);
	}

	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Subject', subjectSchema);