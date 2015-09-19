(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.factory('authService', authService);

	function authService(API_PREFIX, $q, $http, $rootScope, localStorageService, base64) {
		var currentUser = null;

		var service = {
			getCurrentUser: getCurrentUser, 
			login: login,
			logout: logout,
			getAuthStr: getAuthStr
		};

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

			function loginSuccess() {
				currentUser = {
					username: username,
					password: password
				};

				localStorageService.set('currentUser', currentUser);
				$rootScope.$emit('loginStatusChanged');

				return $q.resolve();
			}

			function loginFailed() {
				currentUser = null;

				return $q.reject();
			}
		}

		function logout() {
			currentUser = null;
			localStorageService.remove('currentUser');
			$rootScope.$emit('loginStatusChanged');
		}

		function getCurrentUser() {
			if(!currentUser) {
				var localStorageUser = localStorageService.get('currentUser');
				if(localStorageUser) {
					console.log('Retrieving user from local storage');
					currentUser = localStorageUser;
					$rootScope.$emit('loginStatusChanged');
				}
			}

			return currentUser;
		}

		function getAuthStr(username, password) {
			return 'Basic ' + base64.encode(username + ':' + password);
		}
	}
})();