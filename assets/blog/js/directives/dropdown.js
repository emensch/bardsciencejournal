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

	function DropdownController($element) {
		var vm = this;

		vm.select = select;
		vm.selectDefault = selectDefault;
		vm.toggleMenu = toggleMenu;
		vm.activeItem = activeItem;
		vm.defaultActive = defaultActive;
		vm.active = false;
		vm.selectedOption = vm.defaultName;

		var ngModel = $element.controller('ngModel');

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
	}
})();