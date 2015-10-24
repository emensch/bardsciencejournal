(function() {
	'use strict';

	angular
		.module('bsj')
		.factory('searchService', searchService);

	function searchService($location, $rootScope) {
		var service = {
			search: search
		};

		return service;

		function search(term) {
			if(term) {
				$location.url('/archive?search=' + term);
				$rootScope.$emit('searchSubmitted');
			}
		}
	}
})();