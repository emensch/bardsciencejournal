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

	function DatepickerController() {
		var vm = this;

		vm.toggleMenu = toggleMenu;
		vm.active = false;

		function toggleMenu() {
			vm.active = !vm.active;
			console.log(vm.active);
		}
	}
})();