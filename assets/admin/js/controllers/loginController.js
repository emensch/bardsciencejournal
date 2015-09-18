(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('loginController', loginController);

	function loginController(authService, $location) {
		var vm = this;

		vm.submit = submit;

		function submit() {
			if(vm.username && vm.password) {
				var credentials = {
					username: vm.username,
					password: vm.password
				};

				return authService.login(credentials)
					.then(loginComplete)
					.catch(loginFailed);
			}

			function loginComplete() {
				$location.path('/admin');
				console.log(authService.getCurrentUser());
			}

			function loginFailed() {
				console.log('Login failed');
			}
		}
	}
})();