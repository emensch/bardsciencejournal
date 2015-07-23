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

		cb(null, category);
	});
};

categorySchema.statics.deleteBySlug = function (slug, cb) {
	this.findOne({ slug: slug })
	.remove( function (err) {
		if (err) {
			cb(err);
		}

		cb(null, err);
	})
};

categorySchema.statics.createFromBody = function (body, cb) {
	newCategory = new this({
		name: body.name
	});

	newCategory.save(cb);
};

categorySchema.pre('validate', function (next) {
	if (!this.isModified('name')) return next();

	this.slug = slug(this.name);
	next();
});

module.exports = mongoose.model('Category', categorySchema);