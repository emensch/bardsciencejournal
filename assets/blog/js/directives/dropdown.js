(function() {
	'use strict';

	angular
		.module('bsj')
		.directive('dropdown', dropdown);

	function dropdown($timeout) {
		var directive = {
			link: link,
			restrict: 'A',
			require: 'ngModel',
		};

		return directive;

		function link($scope, $elem, $attrs, ngModel) {
			
		}
	}
})();