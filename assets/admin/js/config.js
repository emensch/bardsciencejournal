(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.config(configure);

	configure.$inject = [
		'$httpProvider',
		'localStorageServiceProvider'
	];

	function configure($httpProvider, localStorageServiceProvider) {
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		$httpProvider.interceptors.push('authInterceptor');

		localStorageServiceProvider.setPrefix('bsj');
	}
})();