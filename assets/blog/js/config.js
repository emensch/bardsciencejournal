(function() {
	'use strict';

	angular
		.module('bsj')
		.config(configure);

	configure.$inject = [
		'$animateProvider'
	];

	function configure($animateProvider) {
		$animateProvider.classNameFilter(/ng-animate-enabled/);
	}
})();