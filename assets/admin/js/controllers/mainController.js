(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.controller('mainController', mainController);

	function mainController(localStorageService) {
		var vm = this;

		console.log('localStorage: ', localStorageService.get('currentUser'));
	}
})();