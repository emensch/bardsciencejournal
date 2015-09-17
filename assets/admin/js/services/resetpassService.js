(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.factory('resetpassService', resetpassService);

	function resetpassService(API_PREFIX, $q, $http) {
		var service = {
			checkToken: checkToken,
			submitPass: submitPass
		};

		return service;

		function checkToken(username, token) {
			return $http.get(API_PREFIX + '/users/' + username + '/resetpassword/' + token)
				.then(checkTokenComplete)
				.catch(checkTokenFailed);

			function checkTokenComplete() {
				return $q.resolve();
			}

			function checkTokenFailed() {
				return $q.reject();
			}
		}

		function submitPass(username, token, password) {
			var config = {
				headers: {'Content-Type': 'application/json'},
				data: {
					password: password
				}
			};

			return $http.delete(API_PREFIX + '/users/' + username + '/resetpassword/' + token, config)
				.then(submitPassComplete)
				.catch(submitPassFailed);

			function submitPassComplete() {
				return $q.resolve();
			}

			function submitPassFailed() {
				return $q.reject();
			}
		}
	}
})();