(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.directive('validateUsername', validateUsername);

	function validateUsername() {
		var directive = {
			link: link,
			restrict: 'A',
			require: 'ngModel'
		};

			return directive;

		function link($scope, $elem, $attrs, ngModel) {
			var regex = new RegExp(/^[a-zA-Z0-9_-]{3,16}$/);

			$scope.$watch($attrs.ngModel, function(value) {
				var valid = regex.test(value);
				ngModel.$setValidity('pattern', valid);
			});
		}	
	}
})();