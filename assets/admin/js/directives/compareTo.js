(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.directive('compareTo', compareTo);

	function compareTo() {
		var directive = {
			link: link,
			restrict: 'A',
			require: 'ngModel',
			scope: {
				otherVal: '=compareTo'
			}
		};

		return directive;

		function link(scope, elem, attrs, ngModel) {
			ngModel.$validators.compareTo = function(modelValue) {
				return modelValue == scope.otherVal;
			};

			scope.$watch('otherVal', function() {
				ngModel.$validate();
			});
		}
	}
})();