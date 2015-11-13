(function() {
	'use strict';

	angular
		.module('bsj')
		.controller('footerController', footerController);

	function footerController() {
		var vm = this;
		vm.year = new Date().getFullYear();
	}
})();