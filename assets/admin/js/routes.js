(function() {
	'use strict';

	angular
		.module('bsj.admin')
		.config(router);

	function router($routeProvider, $locationProvider) {
		$routeProvider
			.when('/admin', {
				templateUrl: 'admin/partials/main.html',
				controller: 'mainController',
				controllerAs: 'vm'
			}) 
			.when('/admin/login', {
				templateUrl: 'admin/partials/login.html',
				controller: 'loginController',
				controllerAs: 'vm'
			})
			.when('/admin/register', {
				templateUrl: 'admin/partials/register.html',
				controller: 'registerController',
				controllerAs: 'vm'
			})
			.when('/admin/resetpassword', {
				templateUrl: 'admin/partials/resetpass.html',
				controller: 'resetpassController',
				controllerAs: 'vm'
			});

			$locationProvider.html5Mode(true);
	}
})();