(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.directive('ckEditor', ckEditor);

	function ckEditor() {
		var directive = {
			link: link,
			restrict: 'A',
			require: 'ngModel',
		};

		return directive;

		function link($scope, $elem, $attrs, ngModel) {
			var ck = CKEDITOR.replace($elem[0]);

			ck.on('change', function() {
				$scope.$apply(function() {
					ngModel.$setViewValue(ck.getData());
				});
			});

			ngModel.$render = function() {
				ck.setData(ngModel.$modelValue);
			};

			$scope.$on('$destroy', function() {
				ck.destroy();
			});
		}
	}
})();