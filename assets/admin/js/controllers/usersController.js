(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('usersController', usersController);

	function usersController(userService) {
		var vm = this;

		vm.users = [];
		vm.approveUser = approveUser;
		vm.deleteUser = deleteUser;

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

		function approveUser(user) {
			userService.approveUser(user.username)
				.then(function() {
					user.approved = true;
				});
		}

		function deleteUser(user) {
			userService.deleteUser(user.username)
				.then(function() {
					getUsers();
				});
		}
	}
})();