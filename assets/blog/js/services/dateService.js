(function() {
	'use strict';

	angular
		.module('bsj')
		.factory('dateService', dateService);

	function dateService($filter) {
		var service = {
			longToShort: longToShort,
			shortToLong: shortToLong,
			displayString: displayString,
			shortToObj: shortToObj,
			objToShort: objToShort,
			compare: compare
		};

		return service;

		function longToShort(longDate) {
			if(longDate) {
				var date = new Date(longDate);
				return $filter('date')(date, 'MM-yyyy');
			}
			return null;
		}

		function shortToLong(shortDate) {
			if(shortDate) {
				var shortObj = shortToObj(shortDate);
				var date = new Date(shortObj.year, shortObj.month, 1);
				return $filter('date')(date, 'MM-dd-yyyy');
			}
			return null;
		}

		function displayString(shortDate) {
			if(shortDate) {
				var shortObj = shortToObj(shortDate);
				var date = new Date(shortObj.year, shortObj.month, 1);
				return $filter('date')(date, 'MMM yyyy');
			}
			return null;
		}

		function shortToObj(shortDate) {
			if(shortDate) {
				var vals = shortDate.split('-');
				var obj = {
					month: parseInt(vals[0]) - 1,
					year: parseInt(vals[1])
				};
				return obj;
			}
			return null;	
		}

		function objToShort(obj) {
			if(obj) {
				return (obj.month + 1) + '-' + obj.year;
			}
			return null;
		}

		function compare(d1, d2) {
			var m1 = (d1.year*12) + d1.month;
			var m2 = (d2.year*12) + d2.month;
			if(m1 > m2) {
				return 1;
			} else if (m1 == m2) {
				return 0;
			} else {
				return -1;
			}
		}
	}
})();