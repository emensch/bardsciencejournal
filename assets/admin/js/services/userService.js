(function() {
	angular
		.module('bsj.admin')
		.factory('userService', userService);

	function userService(API_PREFIX, $http) {
		var service = {
			getUsers: getUsers,
			createUser: createUser,
			deleteUser: deleteUser,
			approveUser: approveUser
		};

		return service;

		function getUsers() {

			function getUsersComplete(res) {

			}

			function getUsersFailed(res) {

			}
		}

		function createUser(data) {

			function createUserComplete(res) {

			}

			function createUserFailed(res) {

			}
		}	

		function deleteUser(username) {

			function deleteUserComplete(res) {

			}

			function deleteUserFailed(res) {

			}
		}

		function approveUser(username) {

			function approveUserComplete(res) {

			}

			function approveUserFailed(res) {

			}
		}
	}
})();