(function() {
	'use strict';
		
	angular
		.module('bsj')
		.controller('navController', navController);

	function navController($location, searchService) {
		var vm = this;

		vm.isActive = isActive;
		vm.submit = submit;

		function isActive(path) {
			return path === $location.path();
		}

		function submit() {
			searchService.search(vm.search);
		}
	}
})();	