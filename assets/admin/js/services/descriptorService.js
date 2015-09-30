(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.service('descriptorService', descriptorService);

	function descriptorService(API_PREFIX, $q, $http) {
		var service = {
			getSubjects: getSubjects,
			getTypes: getTypes,
			createSubject: createSubject,
			createType: createType,
			deleteSubject: deleteSubject,
			deleteType: deleteType
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

		function createSubject(data) {
			return $http.post(API_PREFIX + '/subjects', data)
				.then(createSubjectComplete)
				.catch(createSubjectFailed);

			function createSubjectComplete() {
				return $q.resolve();
			}

			function createSubjectFailed() {
				return $q.reject();
			}
		}

		function createType(data) {
			return $http.post(API_PREFIX + '/types', data)
				.then(createTypeComplete)
				.catch(createTypeFailed);

			function createTypeComplete() {
				return $q.resolve();
			}

			function createTypeFailed() {
				return $q.reject();
			}
		}

		function deleteSubject(slug) {
			return $http.delete(API_PREFIX + '/subjects/' + slug)
				.then(deleteSubjectsComplete)
				.catch(deleteSubjectsFailed);

			function deleteSubjectsComplete() {
				return $q.resolve();
			}

			function deleteSubjectsFailed() {
				return $q.reject();
			}
		}

		function deleteType(slug) {
			return $http.delete(API_PREFIX + '/types/' + slug)
				.then(deleteTypesComplete)
				.catch(deleteTypesFailed);

			function deleteTypesComplete() {
				return $q.resolve();
			}

			function deleteTypesFailed() {
				return $q.reject();
			}
		}
	}
})();