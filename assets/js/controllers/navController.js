(function() {	
	angular
		.module('bsj')
		.controller('navController', navController);

	function navController($location) {
		var vm = this;
		vm.isActive = function(path) {
			return path === $location.path();
		}
	}
})();	