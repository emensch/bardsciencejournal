var mongoose = require('mongoose'),
	slug = require('slug'),
	Schema = mongoose.Schema;

var categorySchema = new Schema({
	name: { type: String, required: true }, 
	slug: { type: String, required: true, unique: true, index: true }
});

categorySchema.statics.findAll = function (cb) {
	this.find({})
	.select('-_id -__v')
	.exec( function (err, category) {
		if (err) {
			cb(err);
		}

		cb(null, category);
	})
};

categorySchema.statics.findBySlug = function (slug, cb) {
	this.findOne({ slug: slug })
	.select('-_id -__v')
	.exec( function (err, category) {
		if (err) {
			cb(err);
		}

		if(!category) {
			var err = new Error();
			err.http_code = 404;
			return cb(err);
		}

		cb(null, category);
	});
};

categorySchema.statics.deleteBySlug = function (slug, cb) {
	this.findOneAndRemove({ slug: slug }, function (err, category) {
		if (err) {
			cb(err);
		}

		if(!category) {
			var err = new Error();
			err.http_code = 404;
			return cb(err);
		}

		cb(null, err);
	})
};

categorySchema.statics.createFromBody = function (body, cb) {
	newCategory = new this({
		name: body.name
	});

	newCategory.save( function (err) {
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

categorySchema.pre('validate', function (next) {
	if (!this.isModified('name')) return next();

	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Category', categorySchema);