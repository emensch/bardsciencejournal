(function() {
	'use strict';
		
	angular
		.module('bsj.admin')
		.controller('navController', navController);

	function navController($rootScope, $location, authService) {
		var vm = this;

		vm.user = null;
		vm.logout = logout;
		vm.isActive = isActive;
		
		$rootScope.$on('loginStatusChanged', updateUser);

		function updateUser() {
			vm.user = authService.getCurrentUser();
		}

		function logout() {
			authService.logout();
			$location.path('/admin/login');
		}

		function isActive(path) {
			return path === $location.path();
		}
	}
})();	