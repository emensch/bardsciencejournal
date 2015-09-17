(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.factory('userService', userService);

	function userService(API_PREFIX, $q, $http) {
		var service = {
			getUsers: getUsers,
			createUser: createUser,
			deleteUser: deleteUser,
			approveUser: approveUser
		};

		return service;

		function getUsers(options) {
			var queryStr = '';
			if (options) {
				queryStr = queryBuildService.buildQueryStr(options);
			}

			return $http.get(API_PREFIX + '/users' + queryStr)
				.then(getUsersComplete)
				.catch(getUsersFailed);

			function getUsersComplete(res) {
				return res.data;
			}

			function getUsersFailed(res) {
				console.log('Failed to retrieve '+res.config.url);
				return $q.reject();
			}
		}

		function createUser(data) {
			return $http.post(API_PREFIX + '/users', data)
				.then(createUserComplete)
				.catch(createUserFailed);

			function createUserComplete() {
				return $q.resolve();
			}

			function createUserFailed() {
				return $q.reject();
			}
		}	

		function deleteUser(username) {
			return $http.delete(API_PREFIX + '/users/' + username)
				.then(deleteUserComplete)
				.catch(deleteUserFailed);

			function deleteUserComplete() {
				return $q.resolve();
			}

			function deleteUserFailed() {
				return $q.reject();
			}
		}

		function approveUser(username) {
			return $http.post(API_PREFIX + '/users/' + username + '/approve')
				.then(approveUserComplete)
				.catch(approveUserFailed);

			function approveUserComplete() {
				return $q.resolve();
			}

			function approveUserFailed() {
				return $q.reject();
			}
		}
	}
})();