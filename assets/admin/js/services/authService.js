(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.factory('authService', authService);

	function authService(API_PREFIX, $q, $http, $rootScope, localStorageService, base64, navService) {
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

			function loginSuccess(res) {
				currentUser = {
					username: username,
					password: password
				};

				localStorageService.set('currentUser', currentUser);
				navService.setVisible(true);

				$rootScope.$emit('navVisibilityChanged');
				$rootScope.$emit('loginStatusChanged');

				return $q.resolve(res);
			}

			function loginFailed(res) {
				currentUser = null;

				return $q.reject(res);
			}
		}

		function logout() {
			currentUser = null;
			localStorageService.remove('currentUser');
			navService.setVisible(false);

			$rootScope.$emit('navVisibilityChanged')
			$rootScope.$emit('loginStatusChanged');
		}

		function getCurrentUser() {
			if(!currentUser) {
				var localStorageUser = localStorageService.get('currentUser');
				if(localStorageUser) {
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