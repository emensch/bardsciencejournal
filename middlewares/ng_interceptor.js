var resolve = require('path').resolve;

function ng_interceptor (routes, path) {
	return function (req, res, next) {
		if (routes.indexOf(req.path) != -1) {
			index = resolve(path);
			res.sendFile(index);
		} else {
			next();
		}
	}
}

module.exports = ng_interceptor;