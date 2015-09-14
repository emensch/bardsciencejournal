(function() {
	angular
		.module('bsj.admin')
		.factory('resetpassService', resetpassService);

	function resetpassService($q, $http) {
		var service = {
			checkToken: checkToken,
			submitPass: submitPass
		}

		return service;

		function checkToken(username, token) {
			return $http.get('api/users/' + username + '/resetpassword/' + token)
				.then(checkTokenComplete)
				.catch(checkTokenFailed);

			function checkTokenComplete(res) {
				return $q.resolve();
			}

			function checkTokenFailed(res) {
				console.log('fale')
				return $q.reject();
			}
		}

		function submitPass(username, token, password) {
			var config = {
				headers: {'Content-Type': 'application/json'},
				data: {
					password: password
				}
			}

			return $http.delete('api/users/' + username + '/resetpassword/' + token, config)
				.then(submitPassComplete)
				.catch(submitPassFailed);

			function submitPassComplete(res) {
				return true;
			}

			function submitPassFailed(res) {
				return false;
			}
		}
	}
})();