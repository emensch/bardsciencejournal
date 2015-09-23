(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.directive('validateEmail', validateEmail);

	function validateEmail() {
		var directive = {
			link: link,
			restrict: 'A',
			require: 'ngModel'
		};

			return directive;

		function link($scope, $elem, $attrs, ngModel) {
			var regex = new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/);

			$scope.$watch($attrs.ngModel, function(value) {
				var valid = regex.test(value);
				ngModel.$setValidity('pattern', valid);
			});
		}	
	}
})();