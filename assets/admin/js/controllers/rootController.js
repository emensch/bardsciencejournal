(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('rootController', rootController);

	function rootController($rootScope, $location, authService) {
		var vm = this;

		vm.user = null;
		vm.logout = logout;

		$rootScope.$on('loginStatusChanged', updateUser);

		function updateUser() {
			vm.user = authService.getCurrentUser();
		}

		function logout() {
			authService.logout();
			$location.path('/admin/login');
		}
	}
})();