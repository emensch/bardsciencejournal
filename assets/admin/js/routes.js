(function() {
	angular
		.module('bsj.admin')
		.config(router)

	function router($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'partials/main.html',
				controller: 'homeController',
				controllerAs: 'vm'
			}) 
			.when('/login', {
				templateUrl: 'partials/login.html',
				controller: 'archiveController',
				controllerAs: 'vm'
			})
			.when('/resetpassword', {
				templateUrl: 'partials/resetpass.html',
				controller: 'archiveController',
				controllerAs: 'vm'
			});

			$locationProvider.html5Mode(true);
	};	
})();