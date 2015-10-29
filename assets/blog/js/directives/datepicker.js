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

	function DatepickerController($scope, $rootScope, $element, $document, $filter) {
		var vm = this;

		vm.toggleMenu = toggleMenu;
		vm.active = false;
		vm.activeMonth = activeMonth;
		vm.selectMonth = selectMonth;
		vm.dateString = 'Jan 2015';
		vm.nextYear = nextYear;
		vm.prevYear = prevYear;
		vm.getYear = getYear;

		vm.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		var date = new Date(2015, 0, 1);

		var ngModel = $element.controller('ngModel');

		ngModel.$render = function() {
			console.log($filter('date')(date, 'MMM yyyy'));
		};

		function toggleMenu() {
			vm.active = !vm.active;
		}

		function activeMonth(month) {
			return month === date.getMonth();
		}

		function selectMonth(month) {
			date.setMonth(month);
			renderDate();
		}

		function nextYear() {
			date.setYear(date.getFullYear() + 1);
			renderDate();
		}

		function prevYear() {
			date.setYear(date.getFullYear() - 1);
			renderDate();
		}

		function getYear() {
			return date.getFullYear();
		}

		function renderDate() {
			vm.dateString = $filter('date')(date, 'MMM yyyy');
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