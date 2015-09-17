(function() {
	angular
		.module('bsj.admin')
		.factory('authService', authService);

	function authService($q, $http, base64) {
		var currentUser = null;

		var service = {
			currentUser: currentUser, 
			login: login,
			logout: logout,
			getAuthStr: getAuthStr
		}

		return service;

		function login(credentials) {
			var username = credentials.username;
			var password = credentials.password;

			var authStr = getAuthStr(username, password);

			var config = {
				headers: {
					'Authorization': authStr,
				}
			};

			return $http.get('api/auth', config)
				.then(loginSuccess)
				.catch(loginFailed);

			function loginSuccess(res) {
				currentUser = {
					username: username,
					password: password
				}

				console.log('Auth')
				return $q.resolve();
			}

			function loginFailed(res) {
				currentUser = null;
				console.log('Auth failed');

				return $q.reject();
			}
		}

		function logout() {
			currentUser = {};
		}

		function getAuthStr(username, password) {
			return 'Basic ' + base64.encode(username + ':' + password);
		}
	}
})();