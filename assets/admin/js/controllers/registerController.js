(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('registerController', registerController);

	function registerController($location, userService) {
		var vm = this;

		vm.error = '';
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
				$location.path('/admin/login');
			}

			function createUserFailed(res) {
				switch (res.status) {
					case 409:
						vm.error = 'That username or email is already taken.';
						break;
					default:
						vm.error = 'An error occurred. Try again later';
						break;
				}
			}	
		}
	}
})();