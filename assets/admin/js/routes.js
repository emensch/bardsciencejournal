(function() {
	angular
		.module('bsj.admin')
		.config(router)

	function router($routeProvider, $locationProvider) {
		$routeProvider
			.when('/admin', {
				templateUrl: 'partials/main.html',
				controller: 'homeController',
				controllerAs: 'vm'
			}) 
			.when('/admin/login', {
				templateUrl: 'partials/login.html',
				controller: 'archiveController',
				controllerAs: 'vm'
			})
			.when('/admin/resetpassword', {
				templateUrl: 'partials/resetpass.html',
				controller: 'archiveController',
				controllerAs: 'vm'
			});

			$locationProvider.html5Mode(true);
	};	
})();