(function() {
	'use strict';

	angular
		.module('bsj')
		.service('descriptorService', descriptorService);

	function descriptorService(API_PREFIX, $http) {
		var service = {
			getSubjects: getSubjects,
			getTypes: getTypes,
			getDates: getDates 
		};

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

		function getDates() {
			return $http.get(API_PREFIX + '/dates')
				.then(getDatesComplete)
				.catch(getDatesFailed);

			function getDatesComplete(res) {
				return res.data;
			}

			function getDatesFailed(res) {
				console.log('Failed to retrieve '+res.config.url);
			}
		}
	}
})();