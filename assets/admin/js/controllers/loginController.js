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

			function loginFailed(res) {
				switch(res.status) {
					case 401:
						vm.error = 'Incorrect username or password';
						break;
					default:
						vm.error = 'An error occurred. Try again later';
						break;
				}
				console.log('Login failed');
			}
		}
	}
})();