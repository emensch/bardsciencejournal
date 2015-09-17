(function() {
	angular
		.module('bsj.admin')
		.factory('authService', authService);

	function authService(API_PREFIX, $q, $http, base64) {
		var currentUser = null;

		var service = {
			getCurrentUser: getCurrentUser, 
			login: login,
			logout: logout,
			getAuthStr: getAuthStr
		}

		return service;

		function login(credentials) {
			var username = credentials.username;
			var password = credentials.password;
			var authStr = getAuthStr(username, password);

			currentUser = null;

			var config = {
				headers: {
					'Authorization': authStr,
				}
			};

			return $http.get(API_PREFIX + '/auth', config)
				.then(loginSuccess)
				.catch(loginFailed);

			function loginSuccess(res) {
				currentUser = {
					username: username,
					password: password
				}
				
				return $q.resolve();
			}

			function loginFailed(res) {
				currentUser = null;

				return $q.reject();
			}
		}

		function logout() {
			currentUser = null;
		}

		function getCurrentUser(username, password) {
			return currentUser;
		}

		function getAuthStr(username, password) {
			return 'Basic ' + base64.encode(username + ':' + password);
		}
	}
})();