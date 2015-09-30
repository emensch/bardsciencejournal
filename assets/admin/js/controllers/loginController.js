(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('loginController', loginController);

	function loginController(authService, $location) {
		var vm = this;

		vm.submit = submit;

		function submit(creds) {
			if(creds.username && creds.password) {
				var credentials = creds;

				return authService.login(credentials)
					.then(loginComplete)
					.catch(loginFailed);
			}

			function loginComplete() {
				$location.path('/admin');
			}

			function loginFailed() {
				console.log('Login failed');
			}
		}
	}
})();