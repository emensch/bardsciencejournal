(function() {
	angular
		.module('bsj')
		.service('descriptorService', descriptorService);

	function descriptorService(API_PREFIX, $http) {
		var service = {
			getSubjects: getSubjects,
			getTypes: getTypes 
		}

		return service;

		function getSubjects() {
			return $http.get(API_PREFIX + '/subjects')
				.then(getSubjectsComplete)
				.catch(getSubjectsFailed);

			function getSubjectsComplete(res) {
				return res.data;
			}

			function getSubjectsFailed(res) {
				console.log('Failed to retrieve '+res.config.url);
			}
		}

		function getTypes() {
			return $http.get(API_PREFIX + '/types')
				.then(getTypesComplete)
				.catch(getTypesFailed);

			function getTypesComplete(res) {
				return res.data;
			}

			function getTypesFailed(res) {
				console.log('Failed to retrieve '+res.config.url);
			}
		}
	}
})();