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
				defaultDate: '@'
			},
			templateUrl: 'partials/datepicker.html'
		};

		return directive;
	}

	function DatepickerController($scope, $rootScope, $element, $document, $filter, $attrs) {
		var vm = this;

		vm.toggleMenu = toggleMenu;
		vm.active = false;
		vm.activeMonth = activeMonth;
		vm.selectMonth = selectMonth;
		vm.dateString = vm.defaultDate;
		vm.nextYear = nextYear;
		vm.prevYear = prevYear;
		vm.getYear = getYear;

		vm.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		var inclusive = 'inclusive' in $attrs;
		var date = new Date();

		var ngModel = $element.controller('ngModel');

		ngModel.$render = function() {
			if(ngModel.$modelValue) {
				date = new Date(ngModel.$modelValue);
				if(inclusive) {
					date.setMonth(date.getMonth() - 1);
				}
				renderDate();
			} else {
				date = new Date(vm.defaultDate);
			}
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
			if(inclusive) {
				var tmpDate = new Date(date);
				tmpDate.setMonth(tmpDate.getMonth() + 1);

				ngModel.$setViewValue($filter('date')(tmpDate, 'MM-dd-yyyy'));
			} else {
				ngModel.$setViewValue($filter('date')(date, 'MM-dd-yyyy'));
			}

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