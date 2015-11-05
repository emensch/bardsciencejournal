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
				minDate: '@',
				maxDate: '@'
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
		vm.disabledMonth = disabledMonth;
		vm.selectMonth = selectMonth;
		vm.dateString = null;
		vm.nextYear = nextYear;
		vm.prevYear = prevYear;
		vm.getYear = getYear;
		vm.isMinYear = isMinYear;
		vm.isMaxYear = isMaxYear;

		vm.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

		var inclusive = 'inclusive' in $attrs;
		var date = null;
		var min = null;
		var max = null;

		var ngModel = $element.controller('ngModel');

		ngModel.$render = function() {
			if(ngModel.$modelValue) {
				var tmpDate = new Date(ngModel.$modelValue);
				date = new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1);
				if(inclusive) {
					date.setMonth(date.getMonth() - 1);
				}
			} else {
				date = null;
			}
		};

		function toggleMenu() {
			vm.active = !vm.active;
		}

		function activeMonth(month) {
			return date ? month === date.getMonth() : null;
		}

		function disabledMonth(month) {
			if(date) {
				var tmpDate = new Date(date.getFullYear(), month, 1);

				if(min && max) {
					return !(tmpDate >= min && (inclusive ? tmpDate <= max : tmpDate < max));
				}

				return false;
			}
			return true;
		}

		function selectMonth(month) {
			if(!disabledMonth(month)) {
				vm.active = false;
				date.setMonth(month);
				renderDate();			
			}
		}

		function nextYear() {
			if(date.getFullYear() < max.getFullYear()) {
				date.setYear(date.getFullYear() + 1);
				if(date.getMonth() >= max.getMonth()) {
					date.setMonth(inclusive ? max.getMonth() : max.getMonth() - 1);
				}
				renderDate();
			}
		}

		function prevYear() {
			if(date.getFullYear() > min.getFullYear()) {
				date.setYear(date.getFullYear() - 1);
				if(date.getMonth() < min.getMonth()) {
					date.setMonth(min.getMonth());
				}
				renderDate();
			}
		}

		function getYear() {
			return date ? date.getFullYear() : null;
		}

		function isMinYear() {
			return (date && min) ? (date.getFullYear() <= min.getFullYear()) : true;
		}

		function isMaxYear() {
			return (date && max) ? (date.getFullYear() >= max.getFullYear()) : true;
		}

		function renderDate() {
			if(date) {
				if(inclusive) {
					var tmpDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
					ngModel.$setViewValue($filter('date')(tmpDate, 'MM-dd-yyyy'));
				} else {
					date.setDate(1);
					ngModel.$setViewValue($filter('date')(date, 'MM-dd-yyyy'));
				}
				vm.dateString = $filter('date')(date, 'MMM yyyy');
			} else {
				vm.dateString = '...';
			}
		}

		$scope.$watch('vm.minDate', function() {
			if(vm.minDate) {
				if(!inclusive) {
					date = new Date(vm.minDate);
					renderDate();
				}
				var tmpMin = new Date(vm.minDate);
				min = new Date(tmpMin.getFullYear(), tmpMin.getMonth(), 1);
			}
		});

		$scope.$watch('vm.maxDate', function() {
			if(vm.maxDate) {
				if(inclusive) {
					date = new Date(vm.maxDate);
					renderDate();				
				}
				var tmpMax = new Date(vm.maxDate);
				max = new Date(tmpMax.getFullYear(), tmpMax.getMonth(), 1);
			}
		});

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