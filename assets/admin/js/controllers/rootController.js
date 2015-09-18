(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('rootController', rootController);

	function rootController($rootScope, $location, authService) {
		var vm = this;

		vm.user = null;

		$rootScope.$on('loginStatusChanged', updateUser);

		function updateUser() {
			vm.user = authService.getCurrentUser();
		}
	}
})();