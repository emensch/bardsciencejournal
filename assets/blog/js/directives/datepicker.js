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
				maxDate: '@',
				dynamicMin: '@',
				dynamicMax: '@'
			},
			templateUrl: 'partials/datepicker.html'
		};

		return directive;
	}

	function DatepickerController($scope, $rootScope, $element, $document, $filter, $attrs, dateService) {
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
				date = dateService.shortToObj(ngModel.$modelValue);
				if(inclusive) {
					date.month = date.month - 1;
				}
			} else {
				date = null;
			}
		};

		function toggleMenu() {
			vm.active = !vm.active;
		}

		function activeMonth(month) {
			return date ? month === date.month : null;
		}

		function disabledMonth(month) {
			if(date) {
				var tmpDate = {
					month: month,
					year: date.year
				};

				var cmpMin = getMin();
				var cmpMax = getMax();

				if(cmpMin && cmpMax) {
					return !(dateService.compare(tmpDate, cmpMin) >= 0 && dateService.compare(tmpDate, cmpMax) <= 0);
				}
			}
			return true;
		}

		function selectMonth(month) {
			if(!disabledMonth(month)) {
				vm.active = false;
				date.month = month;
				renderDate();			
			}
		}

		function nextYear() {
			var cmpMax = getMax();

			if(date.year < cmpMax.year) {
				date.year = (date.year + 1);
				if(date.month > cmpMax.month) {
					date.month = cmpMax.month;
				}
				renderDate();
			}
		}

		function prevYear() {
			var cmpMin = getMin();

			if(date.year > cmpMin.year) {
				date.year = (date.year - 1);
				if(date.month < cmpMin.month) {
					date.month = cmpMin.month;
				}
				renderDate();
			}
		}

		function getYear() {
			return date ? date.year : null;
		}

		function isMinYear() {
			var cmpMin = getMin();
			return (date && cmpMin) ? (date.year <= cmpMin.year) : true;
		}

		function isMaxYear() {
			var cmpMax = getMax();
			return (date && cmpMax) ? (date.year >= cmpMax.year) : true;
		}

		function renderDate() {
			if(date) {
				if(inclusive) {
					var tmpDate = {
						month: date.month + 1,
						year: date.year
					};
					if(dateService.compare(date, max) !== 0) {
						ngModel.$setViewValue(dateService.objToShort(tmpDate));
					} else {
						ngModel.$setViewValue(null);
					}
				} else {
					if(dateService.compare(date, min) !== 0) {
						ngModel.$setViewValue(dateService.objToShort(date));
					} else {
						ngModel.$setViewValue(null);
					}
				}
				vm.dateString = dateService.displayString(dateService.objToShort(date));
			} else {
				ngModel.$setViewValue(null);
				vm.dateString = '...';
			}
		}

		function getMin() {
			if(vm.dynamicMin) {
				return dateService.shortToObj(vm.dynamicMin);
			}
			return min;
		}

		function getMax() {
			if(vm.dynamicMax) {
				var dateObj = dateService.shortToObj(vm.dynamicMax);
				if(!inclusive) {
					var tmpDate = {
						month: dateObj.month - 1,
						year: dateObj.year
					}
					return tmpDate;
				}
				return dateService.shortToObj(vm.dynamicMax);
			}
			return max;
		}

		$scope.$watch('vm.minDate', function() {
			if(vm.minDate) {
				if(!inclusive && !date) {
					date = dateService.shortToObj(vm.minDate);
				}
				min = dateService.shortToObj(vm.minDate);
				if(max) {
					renderDate();
				}
			}
		});

		$scope.$watch('vm.maxDate', function() {
			if(vm.maxDate) {
				if(inclusive && !date) {
					date = dateService.shortToObj(vm.maxDate);
				}
				max = dateService.shortToObj(vm.maxDate);
				if(min) {
					renderDate();
				}
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