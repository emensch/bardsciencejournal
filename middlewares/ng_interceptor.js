var resolve = require('path').resolve,
	minimatch = require('minimatch');

function ng_interceptor (routes, path) {
	return function (req, res, next) {
		if (match(routes, req.path)) {
			index = resolve(path);
			res.sendFile(index);
		} else {
			next();
		}
	};
};

function match (list, str) {
	for(var i = 0; i < list.length; i++) {
		if(minimatch(str, list[i])) {
			return true;
		}
	}
	return false;
};

module.exports = ng_interceptor;