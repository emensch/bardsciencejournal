(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.directive('validatePassword', validatePassword);

	function validatePassword() {
		var directive = {
			link: link,
			restrict: 'A',
			require: 'ngModel'
		};

			return directive;

		function link($scope, $elem, $attrs, ngModel) {
			$scope.$watch($attrs.ngModel, function(value) {
				var valid = value ? (value.length >= 8 && value.length <= 64) : false;
				ngModel.$setValidity($attrs.ngModel, valid);
			});
		}	
	}
})();