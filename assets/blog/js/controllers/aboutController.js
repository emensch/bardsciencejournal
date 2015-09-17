(function() {
	'use strict';

	angular
		.module('bsj')
		.controller('aboutController', aboutController);

	function aboutController() {
		var vm = this;
		vm.message = 'about';
	}
})();