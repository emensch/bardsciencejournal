(function() {
	angular
		.module('bsj.admin')
		.controller('loginController', loginController);

	function loginController(authService) {
		var vm = this;

		vm.submit = function() {
			if(vm.username && vm.password) {
				credentials = {
					username: vm.username,
					password: vm.password
				}

				return authService.login(credentials)
					.then(loginComplete)
					.catch(loginFailed);

				function loginComplete() {
					console.log(authService.getCurrentUser());
				}

				function loginFailed() {
					console.log('Login failed');
				}
			}
		}
	}
})();