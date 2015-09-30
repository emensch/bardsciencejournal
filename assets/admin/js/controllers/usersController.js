(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('usersController', usersController);

	function usersController(userService) {
		var vm = this;

		vm.users = [];

		activate();

		function activate() {
			return getUsers();
		}

		function getUsers() {
			return userService.getUsers()
				.then(function(data) {
					vm.users = data;
					console.log(vm.users);
					return vm.users;
				});
		}
	}
})();