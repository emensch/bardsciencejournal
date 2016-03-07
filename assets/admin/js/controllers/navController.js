(function() {
	'use strict';
		
	angular
		.module('bsj.admin')
		.controller('navController', navController);

	function navController($rootScope, $location, authService, navService) {
		var vm = this;

		vm.user = null;
		vm.showNav = false;
		vm.logout = logout;
		vm.isActive = isActive;

		$rootScope.$on('loginStatusChanged', updateUser);
		$rootScope.$on('navVisibilityChanged', updateVisibility)

		function updateUser() {
			vm.user = authService.getCurrentUser();
		}

		function updateVisibility() {
			vm.showNav = navService.isVisible();
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