(function() {
	angular
		.module('bsj')
		.factory('searchService', searchService);

	function searchService($location) {
		var service = {
			search: search
		}

		return service;

		function search(term) {
			if(term) {
				$location.url('/archive?search=' + term);
			}
		}
	}
})();