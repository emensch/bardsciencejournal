(function() {
	'use strict';

	angular
		.module('bsj')
		.directive('dropdown', dropdown);

	function dropdown() {
		var directive = {
			controller: DropdownController,
			controllerAs: 'vm',
			bindToController: true,
			restrict: 'A',
			require: 'ngModel',
			scope: {
				defaultOption: '@',
				defaultName: '@',
				items: '='
			},
			templateUrl: 'partials/dropdown.html'
		};

		return directive;
	}

	function DropdownController($scope, $element, $document) {
		var vm = this;

		vm.select = select;
		vm.selectDefault = selectDefault;
		vm.toggleMenu = toggleMenu;
		vm.activeItem = activeItem;
		vm.defaultActive = defaultActive;
		vm.active = false;
		vm.selectedOption = vm.defaultName;

		var ngModel = $element.controller('ngModel');

		ngModel.$render = function() {
			if(ngModel.$modelValue) {
				vm.selectedOption = ngModel.$modelValue;
			} else {
				vm.selectedOption = vm.defaultName;
			}
		};

		function select(item) {
			ngModel.$setViewValue(item.name);
			vm.selectedOption = item.name;
			vm.active = false;
		}

		function selectDefault() {
			ngModel.$setViewValue(null);
			vm.selectedOption = vm.defaultName;
			vm.active = false;
		}

		function toggleMenu() {
			vm.active = !vm.active;
		}

		function activeItem(item) {
			return item.name === ngModel.$modelValue;
		}

		function defaultActive() {
			return !ngModel.$modelValue;
		}

		$element.on('click', stopProp);
		function stopProp(event) {
			event.stopPropagation();
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