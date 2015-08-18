(function() {	
	angular
		.module('bsj')
		.controller('navController', navController);

	function navController($location, searchService) {
		var vm = this;

		vm.isActive = function(path) {
			return path === $location.path();
		}

		vm.submit = function() {
			searchService.search(vm.search);
		}
	}
})();	