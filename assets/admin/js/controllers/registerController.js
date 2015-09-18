(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('registerController', registerController);

	function registerController(userService) {
		var vm = this;

		vm.submit = submit;

		function submit() {
			if(vm.pw1 == vm.pw2) {
				var data = {
					username: vm.username,
					email: vm.email,
					password: vm.pw1
				};

				return userService.createUser(data)
					.then(createUserComplete)
					.catch(createUserFailed);
			}

			function createUserComplete() {
				console.log('Creation succeeded');
			}

			function createUserFailed() {
				console.log('Creation failed');
			}	
		}
	}
})();