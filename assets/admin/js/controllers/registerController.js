(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('registerController', registerController);

	function registerController(userService) {
		var vm = this;

		vm.submit = submit;

		function submit(newuser) {
			if(newuser.pw1 == newuser.pw2) {
				var data = {
					username: newuser.username,
					email: newuser.email,
					password: newuser.pw1
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