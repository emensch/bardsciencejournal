(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.factory('navService', navService);

	function navService($rootScope) {
		var visible = false;

		var service = {
			isVisible: isVisible,
			setVisible: setVisible
		};

		return service;

		function isVisible() {
			return visible;
		}

		function setVisible(value) {
			visible = value;
			$rootScope.$emit('navVisibilityChanged');
		}
	}
})();