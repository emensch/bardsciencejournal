(function() {
	'use strict';

	angular
		.module('bsj')
		.factory('queryBuildService', queryBuildService);

	function queryBuildService() {
		var service = {
			buildQueryStr: buildQueryStr
		};

		return service;

		function buildQueryStr(opts) {
			var str = '';
			var i = 0;
			for (var prop in opts) {
				str += (i ? '&' : '?') + prop + '=' + opts[prop];
				i++;
			}
			return str;
		}
	}
})();