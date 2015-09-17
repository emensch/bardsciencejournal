(function() {
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

		function getUsers() {
			return $http.get(API_PREFIX + '/users')
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

			function createUserComplete(res) {
				return $q.resolve();
			}

			function createUserFailed(res) {
				return $q.reject();
			}
		}	

		function deleteUser(username) {
			return $http.delete(API_PREFIX + '/users/' + username)
				.then(deleteUserComplete)
				.catch(deleteUserFailed);

			function deleteUserComplete(res) {
				return $q.resolve();
			}

			function deleteUserFailed(res) {
				return $q.reject();
			}
		}

		function approveUser(username) {
			return $http.post(API_PREFIX + '/users/' + username + '/approve')
				.then(approveUserComplete)
				.catch(approveUserFailed);

			function approveUserComplete(res) {
				return $q.resolve();
			}

			function approveUserFailed(res) {
				return $q.reject();
			}
		}
	}
})();