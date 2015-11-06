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
					year: date.year,
					month: month
				}

				if(min && max) {
					return !(dateService.compare(tmpDate, min) >= 0 
							&& (inclusive ? dateService.compare(tmpDate, max) <= 0 
							: dateService.compare(tmpDate, max) < 0));
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
			if(date.year < max.year) {
				date.year = (date.year + 1);
				if(date.month >= max.month) {
					date.month = (inclusive ? max.month : max.month - 1);
				}
				renderDate();
			}
		}

		function prevYear() {
			if(date.year > min.year) {
				date.year = (date.year - 1);
				if(date.month < min.month) {
					date.month = min.month;
				}
				renderDate();
			}
		}

		function getYear() {
			return date ? date.year : null;
		}

		function isMinYear() {
			return (date && min) ? (date.year <= min.year) : true;
		}

		function isMaxYear() {
			return (date && max) ? (date.year >= max.year) : true;
		}

		function renderDate() {
			if(date) {
				if(inclusive) {
					var tmpDate = {
						year: date.year,
						month: date.month + 1
					};
					ngModel.$setViewValue(dateService.objToShort(tmpDate));
				} else {
					ngModel.$setViewValue(dateService.objToShort(date));
				}
				vm.dateString = dateService.displayString(dateService.objToShort(date));
			} else {
				vm.dateString = '...';
			}
		}

		$scope.$watch('vm.minDate', function() {
			if(vm.minDate) {
				if(!inclusive) {
					date = dateService.shortToObj(vm.minDate);
					renderDate();
				}
				min = dateService.shortToObj(vm.minDate);
				//var tmpMin = new Date(vm.minDate);
				//min = new Date(tmpMin.getFullYear(), tmpMin.getMonth(), 1);
			}
		});

		$scope.$watch('vm.maxDate', function() {
			if(vm.maxDate) {
				if(inclusive) {
					date = dateService.shortToObj(vm.maxDate);
					renderDate();				
				}
				max = dateService.shortToObj(vm.maxDate);
				//var tmpMax = new Date(vm.maxDate);
				//max = new Date(tmpMax.getFullYear(), tmpMax.getMonth(), 1);
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