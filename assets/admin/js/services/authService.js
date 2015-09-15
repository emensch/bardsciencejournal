(function() {
	angular
		.module('bsj.admin')
		.factory('authService', authService);

	function authService($http) {
		var currentUser = {};

		var service = {
			currentUser: currentUser, 
			login: login,
			logout: logout
		}

		return service;

		function login(credentials) {
			var username = credentials.username;
			var password = credentials.password;

			return $http.get('api/auth')
				.then(loginSuccess)
				.catch(loginFailed);

			function loginSuccess(res) {
				currentUser = {
					username: username,
					password: password
				}
			}

			function loginFailed(res) {
				currentUser = {};
				console.log('Auth failed');
			}
		}

		function logout() {
			currentUser = {};
		}
	}
})();