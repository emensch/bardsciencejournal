(function() {
	'use strict';

	angular
		.module('bsj')
		.directive('datepicker', datepicker);

	function datepicker() {
		var directive = {
			controller: DatepickerController,
			controllerAs: 'vm',
			bindToController: true,
			restrict: 'E',
			require: 'ngModel',
			scope: {
				name: '@',
			},
			templateUrl: 'partials/datepicker.html'
		};

		return directive;
	}

	function DatepickerController($scope, $rootScope, $element, $document) {
		var vm = this;

		vm.toggleMenu = toggleMenu;
		vm.active = false;

		function toggleMenu() {
			vm.active = !vm.active;
			console.log(vm.active);
		}

		$element.on('click', clickHandler);
		function clickHandler(event) {
			$rootScope.$emit('menuClicked', $element);
			event.stopPropagation();
		}

		$rootScope.$on('menuClicked', receiveClickEvent);
		function receiveClickEvent(event, data) {
			if($element !== data) {
				closeMenu();
			}
		}

		var body = $document.find('body');
		body.on('click', closeMenu);

		function closeMenu() {
			if(vm.active) {
				vm.active = false;
				$scope.$apply();
			}
		}

		$scope.$on('$destroy', cleanUp);
		function cleanUp() {
			body.off('click');
		}
	}
})();