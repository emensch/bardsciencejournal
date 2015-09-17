(function() {
	angular
		.module('bsj.admin')
		.config(configure);

	configure.$inject = [
		'$httpProvider',
	];

	function configure ($httpProvider) {
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		$httpProvider.interceptors.push('authInterceptor');
	}
})();